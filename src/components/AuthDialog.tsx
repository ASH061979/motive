import { useEffect } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import motivwealthLogo from "@/assets/motivwealth-logo.png";
import { ExternalLink } from "lucide-react";

interface AuthDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const AuthDialog = ({ open, onOpenChange }: AuthDialogProps) => {
  // Auto-redirect when dialog opens
  useEffect(() => {
    if (open) {
      // Small delay to show the dialog briefly before redirecting
      const timer = setTimeout(() => {
        window.location.href = "https://motivewealth.investwell.app";
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [open]);

  const handleLoginClick = () => {
    window.location.href = "https://motivewealth.investwell.app";
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[400px] p-8 border-0 shadow-2xl rounded-2xl">
        <div className="flex flex-col items-center text-center space-y-6">
          {/* Logo */}
          <img 
            src={motivwealthLogo} 
            alt="MotivWealth" 
            className="h-20 w-auto"
          />
          
          {/* Welcome text */}
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold text-foreground">
              Welcome!
            </h2>
            <p className="text-muted-foreground text-sm">
              Redirecting you to the MotivWealth portal...
            </p>
          </div>

          {/* Loading spinner */}
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>

          {/* Manual redirect button */}
          <Button
            onClick={handleLoginClick}
            className="w-full h-12 text-base font-medium rounded-lg bg-primary hover:bg-primary/90"
          >
            <ExternalLink className="w-4 h-4 mr-2" />
            Go to Portal
          </Button>

          <p className="text-xs text-muted-foreground">
            Click the button if you're not redirected automatically
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AuthDialog;
