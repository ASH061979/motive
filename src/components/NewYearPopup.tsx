import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import newYearPoster from "@/assets/new-year-poster.jpg";

const NewYearPopup = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // Check if user has already seen the popup in this session
    const hasSeenPopup = sessionStorage.getItem("newYearPopupSeen");
    if (!hasSeenPopup) {
      // Small delay for better UX
      const timer = setTimeout(() => {
        setOpen(true);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setOpen(false);
    sessionStorage.setItem("newYearPopupSeen", "true");
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && handleClose()}>
      <DialogContent className="p-0 border-0 bg-transparent max-w-[90vw] sm:max-w-md md:max-w-lg overflow-hidden shadow-2xl">
        <Button
          variant="ghost"
          size="icon"
          onClick={handleClose}
          className="absolute right-2 top-2 z-10 bg-background/80 hover:bg-background rounded-full h-8 w-8"
        >
          <X className="h-4 w-4" />
        </Button>
        <img
          src={newYearPoster}
          alt="Happy New Year from MotivWealth"
          className="w-full h-auto rounded-lg"
        />
      </DialogContent>
    </Dialog>
  );
};

export default NewYearPopup;
