
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Navigation from "./components/Navigation";
import Index from "./pages/Index";
import Planning from "./pages/Planning";
import Mood from "./pages/Mood";
import Habits from "./pages/Habits";
import Routines from "./pages/Routines";
import Reminders from "./pages/Reminders";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import Auth from "./pages/Auth";
import Inspire from "./pages/Inspire";
import Library from "./pages/Library";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    // Check if user is authenticated
    const userSession = localStorage.getItem("userSession");
    if (userSession) {
      try {
        const session = JSON.parse(userSession);
        setIsAuthenticated(session.isAuthenticated === true);
      } catch {
        setIsAuthenticated(false);
      }
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  // Show loading while checking authentication
  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-wellness-sage/5 via-wellness-sky/5 to-wellness-lavender/5 flex items-center justify-center">
        <div className="text-wellness-sage-dark">Loading...</div>
      </div>
    );
  }

  // If not authenticated, show auth page
  if (!isAuthenticated) {
    return (
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/auth" element={<Auth />} />
              <Route path="*" element={<Navigate to="/auth" replace />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    );
  }

  // If authenticated, show main app
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="min-h-screen bg-gradient-to-br from-wellness-sage/5 via-wellness-sky/5 to-wellness-lavender/5">
            <div className="flex">
              <Navigation />
              <main className="flex-1 p-4 lg:p-6 lg:pl-0">
                <div className="max-w-6xl mx-auto">
                  <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="/planning" element={<Planning />} />
                    <Route path="/mood" element={<Mood />} />
                    <Route path="/habits" element={<Habits />} />
                    <Route path="/routines" element={<Routines />} />
                    <Route path="/reminders" element={<Reminders />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/settings" element={<Settings />} />
                    <Route path="/inspire" element={<Inspire />} />
                    <Route path="/library" element={<Library />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </div>
              </main>
            </div>
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
