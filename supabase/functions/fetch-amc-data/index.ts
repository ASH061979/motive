import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('Fetching mutual fund data from MFAPI...');
    
    // Fetch all mutual funds from MFAPI
    const response = await fetch('https://api.mfapi.in/mf');
    
    if (!response.ok) {
      throw new Error(`MFAPI returned status: ${response.status}`);
    }

    const funds = await response.json();
    console.log(`Fetched ${funds.length} mutual funds`);

    // Group funds by AMC (extract AMC name from fund name)
    const amcMap = new Map();
    
    funds.forEach((fund: any) => {
      // Extract AMC name (usually the first part of the fund name)
      const amcMatch = fund.schemeName.match(/^([^-]+)/);
      const amcName = amcMatch ? amcMatch[1].trim() : 'Unknown';
      
      if (!amcMap.has(amcName)) {
        amcMap.set(amcName, {
          name: amcName,
          funds: [],
          categories: new Set(),
        });
      }
      
      const amc = amcMap.get(amcName);
      amc.funds.push({
        code: fund.schemeCode,
        name: fund.schemeName,
      });
      
      // Enhanced categorization based on SEBI's official mutual fund categories
      const schemeLower = fund.schemeName.toLowerCase();
      
      // Equity Schemes
      if (schemeLower.includes('equity') || schemeLower.includes('stock') || schemeLower.includes('bluechip') || 
          schemeLower.includes('midcap') || schemeLower.includes('mid cap') || schemeLower.includes('smallcap') || 
          schemeLower.includes('small cap') || schemeLower.includes('large cap') || schemeLower.includes('largecap') ||
          schemeLower.includes('multicap') || schemeLower.includes('multi cap') || schemeLower.includes('flexi cap') ||
          schemeLower.includes('elss') || schemeLower.includes('dividend yield') || schemeLower.includes('value fund') ||
          schemeLower.includes('contra') || schemeLower.includes('focused') || schemeLower.includes('sectoral') || 
          schemeLower.includes('thematic') || schemeLower.includes('banking fund') || schemeLower.includes('pharma') || 
          schemeLower.includes('technology') || schemeLower.includes('infrastructure') || schemeLower.includes('fmcg') || 
          schemeLower.includes('auto')) {
        amc.categories.add('Equity');
      }
      
      // Debt Schemes
      if (schemeLower.includes('debt') || schemeLower.includes('bond') || schemeLower.includes('income fund') ||
          schemeLower.includes('corporate bond') || schemeLower.includes('credit') || schemeLower.includes('duration') ||
          schemeLower.includes('money market') || schemeLower.includes('short term') || schemeLower.includes('medium term') ||
          schemeLower.includes('long term') || schemeLower.includes('dynamic bond') || schemeLower.includes('banking & psu') ||
          schemeLower.includes('banking and psu') || schemeLower.includes('floater')) {
        amc.categories.add('Debt');
      }
      
      // Hybrid Schemes
      if (schemeLower.includes('hybrid') || schemeLower.includes('balanced') || schemeLower.includes('monthly income') ||
          schemeLower.includes('conservative') || schemeLower.includes('aggressive hybrid') || 
          schemeLower.includes('dynamic asset') || schemeLower.includes('multi asset') || 
          schemeLower.includes('arbitrage') || schemeLower.includes('equity savings')) {
        amc.categories.add('Hybrid');
      }
      
      // Liquid/Ultra Short
      if (schemeLower.includes('liquid') || schemeLower.includes('overnight') || schemeLower.includes('ultra short')) {
        amc.categories.add('Liquid');
      }
      
      // Gilt
      if (schemeLower.includes('gilt') || schemeLower.includes('government securities') || schemeLower.includes('g-sec')) {
        amc.categories.add('Gilt');
      }
      
      // Solution Oriented
      if (schemeLower.includes('retirement') || schemeLower.includes('children') || schemeLower.includes("child's") ||
          schemeLower.includes('pension')) {
        amc.categories.add('Solution Oriented');
      }
      
      // Index/ETF/FoF
      if (schemeLower.includes('index') || schemeLower.includes('etf') || schemeLower.includes('exchange traded') ||
          schemeLower.includes('fund of funds') || schemeLower.includes('fof') || schemeLower.includes(' gold') ||
          schemeLower.includes('silver') || schemeLower.includes('international') || schemeLower.includes('nifty') ||
          schemeLower.includes('sensex')) {
        amc.categories.add('Index/ETF');
      }
      
      // Add "Other" if no category matched
      if (amc.categories.size === 0) {
        amc.categories.add('Other');
      }
    });

    // Convert to array and add statistics
    const amcs = Array.from(amcMap.values()).map(amc => ({
      name: amc.name,
      totalFunds: amc.funds.length,
      categories: Array.from(amc.categories),
      funds: amc.funds,
    })).sort((a, b) => b.totalFunds - a.totalFunds);

    console.log(`Processed ${amcs.length} AMCs`);

    // Generate AI insights for each AMC
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    
    if (LOVABLE_API_KEY) {
      console.log('Generating AI insights for each AMC...');
      
      // Process top 20 AMCs with AI insights
      const amcsWithInsights = await Promise.all(
        amcs.slice(0, 20).map(async (amc) => {
          try {
            const aiResponse = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
              method: 'POST',
              headers: {
                'Authorization': `Bearer ${LOVABLE_API_KEY}`,
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                model: 'google/gemini-2.5-flash',
                messages: [
                  {
                    role: 'system',
                    content: 'You are a financial analyst. Provide 2-3 concise bullet points about this AMC. Keep it under 100 words.'
                  },
                  {
                    role: 'user',
                    content: `Analyze ${amc.name} AMC:\n- Total Funds: ${amc.totalFunds}\n- Categories: ${amc.categories.join(', ')}\n\nProvide brief key statistics and insights.`
                  }
                ],
              }),
            });

            if (aiResponse.ok) {
              const aiData = await aiResponse.json();
              return {
                ...amc,
                aiInsights: aiData.choices[0].message.content
              };
            }
          } catch (aiError) {
            console.error(`Error generating insights for ${amc.name}:`, aiError);
          }
          
          return amc;
        })
      );

      // Merge insights back with remaining AMCs
      const finalAmcs = [
        ...amcsWithInsights,
        ...amcs.slice(20).map(amc => ({ ...amc, aiInsights: null }))
      ];

      console.log('AI insights generation completed');

      return new Response(
        JSON.stringify({
          amcs: finalAmcs,
          totalAmcs: amcs.length,
          totalFunds: funds.length,
          lastUpdated: new Date().toISOString(),
        }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    return new Response(
      JSON.stringify({
        amcs,
        totalAmcs: amcs.length,
        totalFunds: funds.length,
        lastUpdated: new Date().toISOString(),
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Error in fetch-amc-data function:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
