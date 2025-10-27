import { Button } from "@/components/ui/button";

const Navbar = () => {
  const navItems = ["Home", "About", "Services", "Contact"];

  return (
    <header className="bg-primary text-primary-foreground sticky top-0 z-50 shadow-sm">
      <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="24" cy="24" r="22" fill="white" stroke="white" strokeWidth="2"/>
            <path d="M24 8C18.5 8 14 12.5 14 18C14 21.5 16 24.5 19 26.5C19 28 18.5 29.5 17.5 31C17.5 31 20 30 22 28.5C22.6 28.6 23.3 28.7 24 28.7C29.5 28.7 34 24.2 34 18.7C34 13.2 29.5 8 24 8Z" fill="#0F5232"/>
            <ellipse cx="20" cy="17" rx="1.5" ry="2" fill="white"/>
            <ellipse cx="28" cy="17" rx="1.5" ry="2" fill="white"/>
            <path d="M24 12C22 12 20.5 13 19.5 14.5C20.5 13.5 22 13 24 13C26 13 27.5 13.5 28.5 14.5C27.5 13 26 12 24 12Z" fill="#0F5232"/>
            <path d="M16 20C16 20 17 22 19 23C20 23.5 21 24 22 24.5" stroke="#0F5232" strokeWidth="0.5" fill="none"/>
            <path d="M32 20C32 20 31 22 29 23C28 23.5 27 24 26 24.5" stroke="#0F5232" strokeWidth="0.5" fill="none"/>
            <circle cx="24" cy="38" r="2" fill="#0F5232"/>
            <rect x="23" y="26" width="2" height="12" fill="#0F5232"/>
            <path d="M20 32C20 32 22 34 24 34C26 34 28 32 28 32" stroke="#0F5232" strokeWidth="1.5" fill="none"/>
          </svg>
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
