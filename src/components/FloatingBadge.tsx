import logo from "@/assets/motivwealth-logo.png";

const FloatingBadge = () => {
  return (
    <div className="fixed bottom-4 right-4 z-50">
      <a 
        href="/" 
        className="block bg-background rounded-full p-2 shadow-lg border border-border hover:shadow-xl transition-shadow"
      >
        <img 
          src={logo} 
          alt="MotivWealth" 
          className="h-10 w-10 object-contain"
        />
      </a>
    </div>
  );
};

export default FloatingBadge;
