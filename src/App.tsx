import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import AboutUs from "./pages/AboutUs";
import Services from "./pages/Services";
import Resources from "./pages/Resources";
import ContactUs from "./pages/ContactUs";
import AMCDirectory from "./pages/AMCDirectory";
import MyAccount from "./pages/MyAccount";
import AdminDashboard from "./pages/AdminDashboard";
import NotFound from "./pages/NotFound";
import FloatingBadge from "./components/FloatingBadge";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/services" element={<Services />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/my-account" element={<MyAccount />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/amc-directory" element={<AMCDirectory />} />
          <Route path="/contact-us" element={<ContactUs />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <FloatingBadge />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
