
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import Index from "./pages/Index";
import Planning from "./pages/Planning";
import Mood from "./pages/Mood";
import Habits from "./pages/Habits";
import Routines from "./pages/Routines";
import Reminders from "./pages/Reminders";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
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

export default App;
