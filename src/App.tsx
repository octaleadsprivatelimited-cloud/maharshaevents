import { useEffect, lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import WhatsAppButton from "./components/WhatsAppButton";
import SiteNotifications from "./components/SiteNotifications";
import BookingFormPopup from "./components/BookingFormPopup";
import { BookingPopupProvider } from "./context/BookingPopupContext";
import { initAdTracking } from "./lib/adTracking";
import Index from "./pages/Index";

// Code split other routes to drastically reduce initial JS bundle size for Google PageSpeed
const About = lazy(() => import("./pages/About"));
const Services = lazy(() => import("./pages/Services"));
const Portfolio = lazy(() => import("./pages/Portfolio"));
const Testimonials = lazy(() => import("./pages/Testimonials"));
const Booking = lazy(() => import("./pages/Booking"));
const Contact = lazy(() => import("./pages/Contact"));
const Admin = lazy(() => import("./pages/Admin"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => {
  useEffect(() => {
    initAdTracking();
    // Defer seeding demo images until after idle
    if (typeof window !== "undefined" && !localStorage.getItem("maharsha_demo_seeded")) {
      const runSeed = () => {
        import("./lib/seedDemoData").then((m) => m.seedDemoImages());
      };
      if ("requestIdleCallback" in window) {
        (window as Window & { requestIdleCallback: (cb: () => void) => number }).requestIdleCallback(runSeed);
      } else {
        setTimeout(runSeed, 3500);
      }
    }
  }, []);

  return (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <BookingPopupProvider>
          <ScrollToTop />
          <WhatsAppButton />
          <SiteNotifications />
          <BookingFormPopup />
          <Suspense fallback={<div className="min-h-screen bg-navy-dark" />}>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<Services />} />
              <Route path="/portfolio" element={<Portfolio />} />
              <Route path="/testimonials" element={<Testimonials />} />
              <Route path="/booking" element={<Booking />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BookingPopupProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
  );
};

export default App;
