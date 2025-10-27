import { Button } from "@/components/ui/button";
import logo from "@/assets/motivwealth-logo.png";

const Navbar = () => {
  const navItems = ["Home", "About", "Services", "Contact"];

  return (
    <header className="bg-primary text-primary-foreground sticky top-0 z-50 shadow-sm">
      <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src={logo} alt="MotivWealth Logo" className="w-12 h-12 object-contain" />
          <span className="text-2xl font-bold">MotivWealth</span>
        </div>
        
        <ul className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <li key={item}>
              <a
                href={`#${item.toLowerCase()}`}
                className="text-primary-foreground hover:text-primary-foreground/80 transition-colors font-medium"
              >
                {item}
              </a>
            </li>
          ))}
        </ul>

        <Button variant="ghost" className="md:hidden text-primary-foreground">
          Menu
        </Button>
      </nav>
    </header>
  );
};

export default Navbar;
