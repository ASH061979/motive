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
import EducationalVideos from "./pages/EducationalVideos";
import MarketInvestorNotes from "./pages/MarketInvestorNotes";
import BlogPost from "./pages/BlogPost";
import Disclaimer from "./pages/Disclaimer";
import CommissionDisclosure from "./pages/CommissionDisclosure";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfUse from "./pages/TermsOfUse";
import FloatingBadge from "./components/FloatingBadge";
import Footer from "./components/Footer";

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
          <Route path="/educational-videos" element={<EducationalVideos />} />
          <Route path="/market-investor-notes" element={<MarketInvestorNotes />} />
          <Route path="/blogs/:slug" element={<BlogPost />} />
          <Route path="/disclaimer" element={<Disclaimer />} />
          <Route path="/commission-disclosure" element={<CommissionDisclosure />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-use" element={<TermsOfUse />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <FloatingBadge />
        <Footer />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
