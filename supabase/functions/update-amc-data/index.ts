import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('Starting AMC data update from MFAPI...');
    
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Fetch all mutual funds from MFAPI
    const response = await fetch('https://api.mfapi.in/mf');
    
    if (!response.ok) {
      throw new Error(`MFAPI returned status: ${response.status}`);
    }

    const funds = await response.json();
    console.log(`Fetched ${funds.length} mutual funds from MFAPI`);

    // Process funds in batches
    const batchSize = 50;
    let processedCount = 0;
    let errorCount = 0;

    for (let i = 0; i < funds.length; i += batchSize) {
      const batch = funds.slice(i, i + batchSize);
      
      // Fetch detailed data for each fund in the batch
      const fundDetailsPromises = batch.map(async (fund: any) => {
        try {
          const detailResponse = await fetch(`https://api.mfapi.in/mf/${fund.schemeCode}`);
          if (!detailResponse.ok) {
            console.warn(`Failed to fetch details for scheme ${fund.schemeCode}`);
            return null;
          }
          const details = await detailResponse.json();
          
          // Extract AMC name from scheme name
          const amcMatch = fund.schemeName.match(/^([^-]+)/);
          const amcName = amcMatch ? amcMatch[1].trim() : 'Unknown';
          
          // Categorize the fund
          const category = categorizeFund(fund.schemeName);
          
          // Get latest NAV data
          const latestNav = details.data && details.data.length > 0 ? details.data[0] : null;
          const previousNav = details.data && details.data.length > 1 ? details.data[1] : null;
          
          return {
            scheme_name: fund.schemeName,
            scheme_code: fund.schemeCode.toString(),
            amc_name: amcName,
            category: category.main,
            sub_category: category.sub,
            latest_nav: latestNav ? parseFloat(latestNav.nav) : null,
            previous_nav: previousNav ? parseFloat(previousNav.nav) : null,
            nav_date: latestNav ? new Date(latestNav.date) : null,
          };
        } catch (error) {
          console.error(`Error processing fund ${fund.schemeCode}:`, error);
          errorCount++;
          return null;
        }
      });

      const fundDetails = (await Promise.all(fundDetailsPromises)).filter(f => f !== null);
      
      // Upsert fund data into the database
      if (fundDetails.length > 0) {
        const { error } = await supabase
          .from('amc_fund_performance')
          .upsert(
            fundDetails,
            { 
              onConflict: 'scheme_code',
              ignoreDuplicates: false 
            }
          );

        if (error) {
          console.error('Error upserting batch:', error);
          errorCount += fundDetails.length;
        } else {
          processedCount += fundDetails.length;
          console.log(`Processed batch ${Math.floor(i / batchSize) + 1}: ${fundDetails.length} funds`);
        }
      }

      // Add a small delay between batches to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    const summary = {
      totalFunds: funds.length,
      processedSuccessfully: processedCount,
      errors: errorCount,
      timestamp: new Date().toISOString(),
    };

    console.log('AMC data update completed:', summary);

    return new Response(
      JSON.stringify({
        success: true,
        message: 'AMC data updated successfully',
        ...summary
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Error in update-amc-data function:', error);
    return new Response(
      JSON.stringify({ 
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error' 
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});

function categorizeFund(schemeName: string): { main: string; sub: string } {
  const nameLower = schemeName.toLowerCase();
  
  // Equity Schemes
  if (nameLower.includes('large cap') || nameLower.includes('bluechip')) {
    return { main: 'Equity', sub: 'Large Cap' };
  }
  if (nameLower.includes('mid cap')) {
    return { main: 'Equity', sub: 'Mid Cap' };
  }
  if (nameLower.includes('small cap')) {
    return { main: 'Equity', sub: 'Small Cap' };
  }
  if (nameLower.includes('multi cap') || nameLower.includes('flexi cap')) {
    return { main: 'Equity', sub: 'Multi Cap' };
  }
  if (nameLower.includes('elss')) {
    return { main: 'Equity', sub: 'ELSS' };
  }
  if (nameLower.includes('sectoral') || nameLower.includes('thematic')) {
    return { main: 'Equity', sub: 'Sectoral/Thematic' };
  }
  if (nameLower.includes('equity')) {
    return { main: 'Equity', sub: 'Other' };
  }
  
  // Debt Schemes
  if (nameLower.includes('liquid')) {
    return { main: 'Debt', sub: 'Liquid' };
  }
  if (nameLower.includes('ultra short')) {
    return { main: 'Debt', sub: 'Ultra Short Duration' };
  }
  if (nameLower.includes('short term') || nameLower.includes('short duration')) {
    return { main: 'Debt', sub: 'Short Duration' };
  }
  if (nameLower.includes('corporate bond')) {
    return { main: 'Debt', sub: 'Corporate Bond' };
  }
  if (nameLower.includes('gilt')) {
    return { main: 'Debt', sub: 'Gilt' };
  }
  if (nameLower.includes('debt') || nameLower.includes('bond') || nameLower.includes('income')) {
    return { main: 'Debt', sub: 'Other' };
  }
  
  // Hybrid Schemes
  if (nameLower.includes('hybrid') || nameLower.includes('balanced')) {
    return { main: 'Hybrid', sub: 'Balanced' };
  }
  if (nameLower.includes('arbitrage')) {
    return { main: 'Hybrid', sub: 'Arbitrage' };
  }
  
  // Index/ETF
  if (nameLower.includes('index') || nameLower.includes('etf') || nameLower.includes('nifty') || nameLower.includes('sensex')) {
    return { main: 'Index/ETF', sub: 'Index' };
  }
  
  // Solution Oriented
  if (nameLower.includes('retirement') || nameLower.includes('children') || nameLower.includes('pension')) {
    return { main: 'Solution Oriented', sub: 'Retirement/Children' };
  }
  
  return { main: 'Other', sub: 'Uncategorized' };
}
