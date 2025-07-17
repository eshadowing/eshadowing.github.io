import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { BetaAccessProvider } from "@/hooks/useBetaAccess";
import { useEffect } from "react";
import { i18n } from "@/lib/i18n";
import Index from "./pages/Index";
import Profile from "./pages/Profile";
import ProgressPage from "./pages/Progress";
import Chat from "./pages/Chat";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  // Update HTML lang attribute based on current language
  useEffect(() => {
    const updateHtmlLang = () => {
      const currentLang = i18n.getCurrentLanguage();
      document.documentElement.lang = currentLang;
    };
    
    // Set initial language
    updateHtmlLang();
    
    // Listen for language changes
    const handleStorageChange = () => {
      updateHtmlLang();
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    // Also listen for custom language change events
    window.addEventListener('languageChanged', updateHtmlLang);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('languageChanged', updateHtmlLang);
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <BetaAccessProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/progress" element={<ProgressPage />} />
              <Route path="/chat" element={<Chat />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </BetaAccessProvider>
    </QueryClientProvider>
  );
};

export default App;
