import { Button } from "@/components/ui/button";
import logo from "@/assets/motivwealth-full-logo.png";
import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState } from "react";
import { User } from "@supabase/supabase-js";
import { Link } from "react-router-dom";
import { Settings, LogIn } from "lucide-react";
import AuthDialog from "@/components/AuthDialog";

const Navbar = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showAuthDialog, setShowAuthDialog] = useState(false);
  
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
            </div>
          ) : (
            <Button onClick={() => setShowAuthDialog(true)} className="gap-2">
              <LogIn className="h-4 w-4" />
              Sign In
            </Button>
          )}
        </div>

        <Button variant="ghost" className="md:hidden text-foreground" onClick={() => setShowAuthDialog(true)}>
          Menu
        </Button>
      </nav>
      
      <AuthDialog open={showAuthDialog} onOpenChange={setShowAuthDialog} />
    </header>
  );
};

export default Navbar;
