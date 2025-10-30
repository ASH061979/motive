import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2, TrendingUp, Building2, Sparkles } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface AMC {
  name: string;
  totalFunds: number;
  categories: string[];
  funds: Array<{ code: string; name: string }>;
}

interface AMCData {
  amcs: AMC[];
  totalAmcs: number;
  totalFunds: number;
  lastUpdated: string;
  aiInsights?: string;
}

const AMCDirectory = () => {
  const [data, setData] = useState<AMCData | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [expandedAMC, setExpandedAMC] = useState<string | null>(null);

  useEffect(() => {
    fetchAMCData();
  }, []);

  const fetchAMCData = async () => {
    try {
      setLoading(true);
      const { data: response, error } = await supabase.functions.invoke('fetch-amc-data');
      
      if (error) throw error;
      setData(response);
    } catch (error) {
      console.error('Error fetching AMC data:', error);
    } finally {
      setLoading(false);
    }
  };

  const categories = ["All", "Equity", "Debt", "Hybrid", "Liquid", "Gilt", "Other"];

  const filteredAMCs = data?.amcs.filter(amc => 
    selectedCategory === "All" || amc.categories.includes(selectedCategory)
  ) || [];

  if (loading) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <main className="container mx-auto px-4 py-12">
          <div className="flex items-center justify-center min-h-[400px]">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-primary mb-4">AMC Directory</h1>
          <p className="text-muted-foreground">
            Explore {data?.totalAmcs} Asset Management Companies managing {data?.totalFunds} mutual funds in India
          </p>
          {data?.lastUpdated && (
            <p className="text-sm text-muted-foreground mt-2">
              Last updated: {new Date(data.lastUpdated).toLocaleString()}
            </p>
          )}
        </div>

        {/* AI Insights */}
        {data?.aiInsights && (
          <Card className="mb-8 border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary" />
                AI-Powered Market Insights
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-foreground/80 whitespace-pre-line leading-relaxed">
                {data.aiInsights}
              </p>
            </CardContent>
          </Card>
        )}

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card className="border-primary/20">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-lg bg-primary/10">
                  <Building2 className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{data?.totalAmcs}</p>
                  <p className="text-sm text-muted-foreground">Total AMCs</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-primary/20">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-lg bg-primary/10">
                  <TrendingUp className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{data?.totalFunds}</p>
                  <p className="text-sm text-muted-foreground">Total Funds</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-primary/20">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-lg bg-primary/10">
                  <Sparkles className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{filteredAMCs.length}</p>
                  <p className="text-sm text-muted-foreground">Filtered AMCs</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Category Filter */}
        <div className="mb-6">
          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
              <Badge
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Badge>
            ))}
          </div>
        </div>

        {/* AMC List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredAMCs.map((amc) => (
            <Card 
              key={amc.name} 
              className="border-primary/20 hover:border-primary/40 transition-colors cursor-pointer"
              onClick={() => setExpandedAMC(expandedAMC === amc.name ? null : amc.name)}
            >
              <CardHeader>
                <CardTitle className="text-lg">{amc.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Total Funds</span>
                    <Badge variant="secondary">{amc.totalFunds}</Badge>
                  </div>
                  
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Categories</p>
                    <div className="flex flex-wrap gap-1">
                      {amc.categories.map(cat => (
                        <Badge key={cat} variant="outline" className="text-xs">
                          {cat}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {expandedAMC === amc.name && (
                    <div className="mt-4 pt-4 border-t border-border">
                      <p className="text-sm font-medium mb-2">Funds ({amc.funds.length})</p>
                      <div className="max-h-48 overflow-y-auto space-y-1">
                        {amc.funds.slice(0, 10).map(fund => (
                          <p key={fund.code} className="text-xs text-muted-foreground truncate">
                            • {fund.name}
                          </p>
                        ))}
                        {amc.funds.length > 10 && (
                          <p className="text-xs text-muted-foreground italic">
                            + {amc.funds.length - 10} more funds
                          </p>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredAMCs.length === 0 && (
          <Card className="border-primary/20">
            <CardContent className="pt-6 text-center">
              <p className="text-muted-foreground">No AMCs found for the selected category.</p>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
};

export default AMCDirectory;
