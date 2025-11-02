import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { User } from "@supabase/supabase-js";
import { Loader2, TrendingUp, FileText, Calculator, Layers, Shield, FolderLock, Target, LogOut } from "lucide-react";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";

interface Transaction {
  date: string;
  scheme: string;
  type: string;
  amount: string;
}

interface UserAsset {
  id: string;
  asset_type: string;
  asset_name: string;
  current_value: number;
  category: string | null;
}

interface AssetTotal {
  mutual_funds: number;
  shares_bonds: number;
  fixed_deposits: number;
  other_assets: number;
}

const MyAccount = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [assets, setAssets] = useState<UserAsset[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [assetTotals, setAssetTotals] = useState<AssetTotal>({
    mutual_funds: 0,
    shares_bonds: 0,
    fixed_deposits: 0,
    other_assets: 0,
  });
  const navigate = useNavigate();

  const categoryAllocation = [
    { name: "Mutual Funds", value: assetTotals.mutual_funds, color: "hsl(var(--primary))" },
    { name: "Shares & Bonds", value: assetTotals.shares_bonds, color: "hsl(var(--chart-2))" },
    { name: "Fixed Deposits", value: assetTotals.fixed_deposits, color: "hsl(var(--chart-3))" },
    { name: "Other Assets", value: assetTotals.other_assets, color: "hsl(var(--chart-4))" },
  ].filter(item => item.value > 0);

  useEffect(() => {
    // Check authentication
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        navigate("/");
        return;
      }
      setUser(session.user);
      setLoading(false);
      fetchUserData(session.user.id);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (!session) {
          navigate("/");
          return;
        }
        setUser(session.user);
        fetchUserData(session.user.id);
      }
    );

    return () => subscription.unsubscribe();
  }, [navigate]);

  const fetchUserData = async (userId: string) => {
    // Fetch user assets
    const { data: assetsData, error: assetsError } = await supabase
      .from("user_assets")
      .select("*")
      .eq("user_id", userId);

    if (!assetsError && assetsData) {
      setAssets(assetsData);
      
      // Calculate totals by asset type
      const totals: AssetTotal = {
        mutual_funds: 0,
        shares_bonds: 0,
        fixed_deposits: 0,
        other_assets: 0,
      };

      assetsData.forEach((asset: UserAsset) => {
        const value = Number(asset.current_value);
        if (asset.asset_type === "mutual_funds") {
          totals.mutual_funds += value;
        } else if (asset.asset_type === "shares_bonds") {
          totals.shares_bonds += value;
        } else if (asset.asset_type === "fixed_deposits") {
          totals.fixed_deposits += value;
        } else if (asset.asset_type === "other_assets") {
          totals.other_assets += value;
        }
      });

      setAssetTotals(totals);
    }

    // Fetch recent transactions
    const { data: transactionsData, error: transactionsError } = await supabase
      .from("user_transactions")
      .select("*")
      .eq("user_id", userId)
      .order("transaction_date", { ascending: false })
      .limit(10);

    if (!transactionsError && transactionsData) {
      const formattedTransactions = transactionsData.map((t: any) => ({
        date: new Date(t.transaction_date).toLocaleDateString("en-GB"),
        scheme: t.scheme_name,
        type: t.transaction_type,
        amount: t.amount.toLocaleString("en-IN"),
      }));
      setTransactions(formattedTransactions);
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    toast.success("Signed out successfully");
    navigate("/");
  };

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
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="flex gap-2">
                <button className="p-2 hover:bg-muted rounded-lg transition-colors">
                  <TrendingUp className="h-5 w-5 text-muted-foreground" />
                </button>
                <button className="p-2 hover:bg-muted rounded-lg transition-colors">
                  <Shield className="h-5 w-5 text-primary" />
                </button>
                <button className="p-2 hover:bg-muted rounded-lg transition-colors">
                  <Target className="h-5 w-5 text-muted-foreground" />
                </button>
              </div>
            </div>
            <Button onClick={handleSignOut} variant="ghost" size="icon">
              <LogOut className="h-5 w-5" />
            </Button>
          </div>

          <div className="space-y-6">
            {/* Asset Allocation Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Asset Allocation</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex items-center justify-center">
                  {categoryAllocation.length > 0 ? (
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={categoryAllocation}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, value }) => `${name}: ${value}%`}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {categoryAllocation.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  ) : (
                    <p className="text-muted-foreground">No allocation data available</p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* My Assets */}
            <div>
              <h2 className="text-2xl font-semibold mb-4">My assets</h2>
              <p className="text-muted-foreground mb-4">Check your investment.</p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card className="hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between mb-4">
                      <TrendingUp className="h-8 w-8 text-primary" />
                    </div>
                      <h3 className="font-semibold mb-2">Mutual Funds</h3>
                      {assetTotals.mutual_funds > 0 ? (
                        <>
                          <p className="text-2xl font-bold mb-1">₹ {assetTotals.mutual_funds.toLocaleString("en-IN")}</p>
                          <p className="text-sm text-muted-foreground">Total Mutual Funds Value</p>
                        </>
                      ) : (
                        <>
                          <p className="text-sm text-muted-foreground mb-3">
                            Track your mutual fund investments and returns.
                          </p>
                          <Button variant="link" className="p-0 h-auto text-primary">
                            Add Now →
                          </Button>
                        </>
                      )}
                  </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between mb-4">
                      <FileText className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <h3 className="font-semibold mb-2">Share & Bond</h3>
                    {assetTotals.shares_bonds > 0 ? (
                      <>
                        <p className="text-2xl font-bold mb-1">₹ {assetTotals.shares_bonds.toLocaleString("en-IN")}</p>
                        <p className="text-sm text-muted-foreground">Total Shares & Bonds Value</p>
                      </>
                    ) : (
                      <>
                        <p className="text-sm text-muted-foreground mb-3">
                          Add your stocks and bonds to build a balanced portfolio.
                        </p>
                        <Button variant="link" className="p-0 h-auto text-primary">
                          Add Now →
                        </Button>
                      </>
                    )}
                  </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between mb-4">
                      <Calculator className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <h3 className="font-semibold mb-2">Fixed Deposit</h3>
                    {assetTotals.fixed_deposits > 0 ? (
                      <>
                        <p className="text-2xl font-bold mb-1">₹ {assetTotals.fixed_deposits.toLocaleString("en-IN")}</p>
                        <p className="text-sm text-muted-foreground">Total Fixed Deposits Value</p>
                      </>
                    ) : (
                      <>
                        <p className="text-sm text-muted-foreground mb-3">
                          Secure, predictable returns with fixed deposit investments.
                        </p>
                        <Button variant="link" className="p-0 h-auto text-primary">
                          Add Now →
                        </Button>
                      </>
                    )}
                  </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between mb-4">
                      <Layers className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <h3 className="font-semibold mb-2">Other Assets</h3>
                    {assetTotals.other_assets > 0 ? (
                      <>
                        <p className="text-2xl font-bold mb-1">₹ {assetTotals.other_assets.toLocaleString("en-IN")}</p>
                        <p className="text-sm text-muted-foreground">Total Other Assets Value</p>
                      </>
                    ) : (
                      <>
                        <p className="text-sm text-muted-foreground mb-3">
                          Manage other investment assets and track their value.
                        </p>
                        <Button variant="link" className="p-0 h-auto text-primary">
                          Add Now →
                        </Button>
                      </>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Insurance Manager */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-2">Insurance Manager</h3>
                    <p className="text-muted-foreground">
                      Add your Insurance details for timely reminders and effortless payments.
                    </p>
                  </div>
                  <div className="flex items-center gap-2 ml-4">
                    <Shield className="h-8 w-8 text-muted-foreground" />
                  </div>
                </div>
                <Button variant="link" className="p-0 h-auto text-primary mt-4">
                  Add Now →
                </Button>
              </CardContent>
            </Card>

            {/* Safe Document Vault & Evaluate Risk Profile */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <FolderLock className="h-8 w-8 text-muted-foreground shrink-0" />
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold mb-2">Safe Document Vault</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Stay prepared with easy access to your vital documents in our secure document vault.
                      </p>
                      <Button variant="link" className="p-0 h-auto text-primary">
                        Add Documents →
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <Target className="h-8 w-8 text-muted-foreground shrink-0" />
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold mb-2">Evaluate Risk Profile</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Identify your ideal investment strategy with a precise risk profile assessment.
                      </p>
                      <Button variant="link" className="p-0 h-auto text-primary">
                        Evaluate Now →
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Purchases/Redemptions */}
            <Card>
              <CardContent className="pt-6">
                <Tabs defaultValue="purchases">
                  <TabsList className="mb-4">
                    <TabsTrigger value="purchases">Recent Purchases</TabsTrigger>
                    <TabsTrigger value="redemptions">Recent Redemptions</TabsTrigger>
                  </TabsList>
                  <TabsContent value="purchases">
                    <div className="flex justify-end mb-4">
                      <Button variant="link" className="text-primary">
                        View more →
                      </Button>
                    </div>
                    {transactions.length > 0 ? (
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Date</TableHead>
                            <TableHead>Scheme</TableHead>
                            <TableHead>Type</TableHead>
                            <TableHead className="text-right">Amount</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {transactions.map((transaction, index) => (
                            <TableRow key={index}>
                              <TableCell>{transaction.date}</TableCell>
                              <TableCell>{transaction.scheme}</TableCell>
                              <TableCell>{transaction.type}</TableCell>
                              <TableCell className="text-right">{transaction.amount}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    ) : (
                      <div className="text-center py-8 text-muted-foreground">
                        No recent purchases
                      </div>
                    )}
                  </TabsContent>
                  <TabsContent value="redemptions">
                    <div className="text-center py-8 text-muted-foreground">
                      No recent redemptions
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            {/* Show Investment Journey Button */}
            <div className="flex justify-center">
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                Show investment journey
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MyAccount;
