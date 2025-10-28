import { Button } from "@/components/ui/button";
import logo from "@/assets/motivwealth-full-logo.png";
import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState } from "react";
import { User } from "@supabase/supabase-js";

const Navbar = () => {
  const [user, setUser] = useState<User | null>(null);
  const navItems = ["Home", "About", "Services", "Contact"];

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
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
              <li key={item}>
                <a
                  href={`#${item.toLowerCase()}`}
                  className="text-foreground hover:text-foreground/80 transition-colors font-medium"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
          {user && (
            <span className="text-foreground font-medium">
              Welcome {getEmailUsername(user.email || "")}
            </span>
          )}
        </div>

        <Button variant="ghost" className="md:hidden text-foreground">
          Menu
        </Button>
      </nav>
    </header>
  );
};

export default Navbar;
