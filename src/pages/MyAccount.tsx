import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { User } from "@supabase/supabase-js";
import { Loader2, BarChart3, LogOut, Building2, MapPin, Calendar } from "lucide-react";
import { toast } from "sonner";

interface SebiAMC {
  name: string;
  registrationNo: string;
  address: string;
  validity: string;
}

interface SebiData {
  amcs: SebiAMC[];
  totalAmcs: number;
  lastUpdated: string;
  source: string;
}

const MyAccount = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [sebiData, setSebiData] = useState<SebiData | null>(null);
  const [loadingSebi, setLoadingSebi] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check authentication
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        navigate("/");
        return;
      }
      setUser(session.user);
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (!session) {
          navigate("/");
          return;
        }
        setUser(session.user);
      }
    );

    return () => subscription.unsubscribe();
  }, [navigate]);

  useEffect(() => {
    fetchSebiData();
  }, []);

  const fetchSebiData = async () => {
    try {
      setLoadingSebi(true);
      const { data: response, error } = await supabase.functions.invoke('fetch-sebi-amcs');
      
      if (error) throw error;
      setSebiData(response);
    } catch (error) {
      console.error('Error fetching SEBI data:', error);
      toast.error("Failed to load SEBI AMC data");
    } finally {
      setLoadingSebi(false);
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
    <div className="min-h-screen">
      <Navbar />
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl font-bold text-primary mb-2">My Account</h1>
              <p className="text-muted-foreground">Welcome back, {user?.email?.split("@")[0]}</p>
            </div>
            <Button onClick={handleSignOut} variant="outline">
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
          </div>

          <div className="grid gap-6">
            {/* Account Information */}
            <Card className="border-primary/20">
              <CardHeader>
                <CardTitle>Account Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Email</p>
                  <p className="font-medium">{user?.email}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Account Created</p>
                  <p className="font-medium">
                    {user?.created_at ? new Date(user.created_at).toLocaleDateString() : "N/A"}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="border-primary/20">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4">
                <Button
                  onClick={() => navigate("/amc-directory")}
                  className="w-full justify-start"
                  variant="outline"
                >
                  <BarChart3 className="h-5 w-5 mr-3" />
                  <div className="text-left">
                    <p className="font-medium">AMC Directory</p>
                    <p className="text-sm text-muted-foreground">
                      Browse Indian Asset Management Companies
                    </p>
                  </div>
                </Button>
              </CardContent>
            </Card>

            {/* SEBI Registered AMCs */}
            <Card className="border-primary/20">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Building2 className="h-5 w-5 text-primary" />
                    SEBI Registered AMCs
                  </CardTitle>
                  {sebiData && (
                    <Badge variant="secondary">{sebiData.totalAmcs} AMCs</Badge>
                  )}
                </div>
                {sebiData?.lastUpdated && (
                  <p className="text-xs text-muted-foreground mt-2">
                    Source: {sebiData.source} • Updated: {new Date(sebiData.lastUpdated).toLocaleDateString()}
                  </p>
                )}
              </CardHeader>
              <CardContent>
                {loadingSebi ? (
                  <div className="flex items-center justify-center py-8">
                    <Loader2 className="h-6 w-6 animate-spin text-primary" />
                  </div>
                ) : sebiData ? (
                  <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2">
                    {sebiData.amcs.map((amc) => (
                      <Card key={amc.registrationNo} className="border-primary/10">
                        <CardContent className="pt-4 space-y-2">
                          <div className="flex items-start justify-between gap-2">
                            <h3 className="font-semibold text-sm">{amc.name}</h3>
                            <Badge variant="outline" className="text-xs shrink-0">
                              {amc.registrationNo}
                            </Badge>
                          </div>
                          <div className="flex items-start gap-2 text-xs text-muted-foreground">
                            <MapPin className="h-3 w-3 mt-0.5 shrink-0" />
                            <p>{amc.address}</p>
                          </div>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <Calendar className="h-3 w-3" />
                            <p>{amc.validity}</p>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground text-center py-4">
                    Unable to load SEBI AMC data
                  </p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MyAccount;
