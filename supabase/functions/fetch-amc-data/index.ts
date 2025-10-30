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
      
      // Categorize based on keywords in scheme name
      const schemeLower = fund.schemeName.toLowerCase();
      if (schemeLower.includes('equity')) amc.categories.add('Equity');
      else if (schemeLower.includes('debt') || schemeLower.includes('bond')) amc.categories.add('Debt');
      else if (schemeLower.includes('hybrid') || schemeLower.includes('balanced')) amc.categories.add('Hybrid');
      else if (schemeLower.includes('liquid') || schemeLower.includes('money market')) amc.categories.add('Liquid');
      else if (schemeLower.includes('gilt')) amc.categories.add('Gilt');
      else amc.categories.add('Other');
    });

    // Convert to array and add statistics
    const amcs = Array.from(amcMap.values()).map(amc => ({
      name: amc.name,
      totalFunds: amc.funds.length,
      categories: Array.from(amc.categories),
      funds: amc.funds,
    })).sort((a, b) => b.totalFunds - a.totalFunds);

    console.log(`Processed ${amcs.length} AMCs`);

    // Use Lovable AI to generate insights
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    let aiInsights = null;

    if (LOVABLE_API_KEY) {
      try {
        console.log('Generating AI insights...');
        const topAmcs = amcs.slice(0, 10).map(amc => 
          `${amc.name}: ${amc.totalFunds} funds across ${amc.categories.join(', ')}`
        ).join('\n');

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
                content: 'You are a financial analyst specializing in Indian mutual funds. Provide brief, actionable insights.'
              },
              {
                role: 'user',
                content: `Analyze these top Indian AMCs and provide 3-4 key insights:\n${topAmcs}\n\nTotal AMCs: ${amcs.length}`
              }
            ],
          }),
        });

        if (aiResponse.ok) {
          const aiData = await aiResponse.json();
          aiInsights = aiData.choices[0].message.content;
          console.log('AI insights generated successfully');
        }
      } catch (aiError) {
        console.error('Error generating AI insights:', aiError);
      }
    }

    return new Response(
      JSON.stringify({
        amcs,
        totalAmcs: amcs.length,
        totalFunds: funds.length,
        lastUpdated: new Date().toISOString(),
        aiInsights,
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
