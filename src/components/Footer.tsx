const Footer = () => {
  return (
    <footer className="bg-secondary border-t border-border py-8">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-2">
          <p className="text-foreground/80 text-sm">
            MotivWealth is the brand name used by Meghna Prakash, AMFI Registered Mutual Fund Distributor; ARN-330963, EUIN-E628002
          </p>
          <p className="text-foreground/60 text-xs">
            Mutual Fund Investments are subject to market risks. Read all scheme related documents carefully.
          </p>
          <p className="text-foreground/50 text-xs mt-4">
            Website developed by Agastya Balaji
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
