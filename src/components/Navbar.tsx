import { Button } from "@/components/ui/button";
import logo from "@/assets/motivwealth-full-logo.png";

const Navbar = () => {
  const navItems = ["Home", "About", "Services", "Contact"];

  return (
    <header className="bg-background sticky top-0 z-50 shadow-sm">
      <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src={logo} alt="MotivWealth Logo" className="h-24 object-contain" />
        </div>
        
        <ul className="hidden md:flex items-center gap-8">
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

        <Button variant="ghost" className="md:hidden text-foreground">
          Menu
        </Button>
      </nav>
    </header>
  );
};

export default Navbar;
