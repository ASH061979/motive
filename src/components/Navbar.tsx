import { Button } from "@/components/ui/button";
import logo from "@/assets/motivwealth-full-logo.png";
import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState } from "react";
import { User } from "@supabase/supabase-js";
import { Link } from "react-router-dom";
import { Settings, LogIn, Menu, X } from "lucide-react";
import AuthDialog from "@/components/AuthDialog";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const Navbar = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showAuthDialog, setShowAuthDialog] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const navItems = [
    { label: "Home", href: "/", isRoute: true },
    { label: "About Us", href: "/about-us", isRoute: true },
    { label: "Services", href: "/services", isRoute: true },
    { label: "Contact Us", href: "/contact-us", isRoute: true }
  ];

  useEffect(() => {
    const checkAdminStatus = async (userId: string) => {
      const { data, error } = await supabase.rpc('has_role', {
        _user_id: userId,
        _role: 'admin'
      });
      
      if (!error) {
        setIsAdmin(data === true);
      }
    };

    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        checkAdminStatus(session.user.id);
      }
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
        if (session?.user) {
          checkAdminStatus(session.user.id);
        } else {
          setIsAdmin(false);
        }
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const getEmailUsername = (email: string) => {
    return email.split('@')[0];
  };

  return (
    <header className="bg-background sticky top-0 z-50 shadow-sm">
      <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src={logo} alt="MotivWealth Logo" className="h-36 object-contain" />
        </div>
        
        <div className="hidden md:flex items-center gap-8">
          <ul className="flex items-center gap-8">
            {navItems.map((item) => (
              <li key={item.label}>
                {item.isRoute ? (
                  <Link
                    to={item.href}
                    className="text-foreground hover:text-foreground/80 transition-colors font-medium"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <a
                    href={item.href}
                    className="text-foreground hover:text-foreground/80 transition-colors font-medium"
                  >
                    {item.label}
                  </a>
                )}
              </li>
            ))}
          </ul>
          {user ? (
            <div className="flex items-center gap-4">
              <span className="text-foreground font-medium">
                Welcome {getEmailUsername(user.email || "")}
              </span>
              {isAdmin && (
                <Button asChild variant="outline" size="sm" className="gap-2">
                  <Link to="/admin">
                    <Settings className="h-4 w-4" />
                    Admin
                  </Link>
                </Button>
              )}
              <Button asChild variant="default">
                <Link to="/my-account">My Account</Link>
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={async () => {
                  await supabase.auth.signOut();
                }}
              >
                Sign Out
              </Button>
            </div>
          ) : (
            <Button onClick={() => setShowAuthDialog(true)} className="gap-2">
              <LogIn className="h-4 w-4" />
              Sign In
            </Button>
          )}
        </div>

        <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" className="md:hidden text-foreground">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[280px] bg-background">
            <SheetHeader>
              <SheetTitle className="text-left">Menu</SheetTitle>
            </SheetHeader>
            <nav className="flex flex-col gap-4 mt-6">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  to={item.href}
                  className="text-foreground hover:text-foreground/80 transition-colors font-medium py-2 border-b border-border"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <div className="pt-4 flex flex-col gap-3">
                {user ? (
                  <>
                    <span className="text-foreground font-medium">
                      Welcome {getEmailUsername(user.email || "")}
                    </span>
                    {isAdmin && (
                      <Button asChild variant="outline" size="sm" className="gap-2 justify-start">
                        <Link to="/admin" onClick={() => setMobileMenuOpen(false)}>
                          <Settings className="h-4 w-4" />
                          Admin
                        </Link>
                      </Button>
                    )}
                    <Button asChild variant="default">
                      <Link to="/my-account" onClick={() => setMobileMenuOpen(false)}>My Account</Link>
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={async () => {
                        await supabase.auth.signOut();
                        setMobileMenuOpen(false);
                      }}
                    >
                      Sign Out
                    </Button>
                  </>
                ) : (
                  <Button onClick={() => { setShowAuthDialog(true); setMobileMenuOpen(false); }} className="gap-2">
                    <LogIn className="h-4 w-4" />
                    Sign In
                  </Button>
                )}
              </div>
            </nav>
          </SheetContent>
        </Sheet>
      </nav>
      
      <AuthDialog open={showAuthDialog} onOpenChange={setShowAuthDialog} />
    </header>
  );
};

export default Navbar;
