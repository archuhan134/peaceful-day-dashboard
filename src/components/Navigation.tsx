
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  Home, 
  Target, 
  Calendar, 
  Repeat, 
  Heart, 
  Bell,
  Sparkles,
  X
} from "lucide-react";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: "Dashboard", path: "/", icon: Home },
    { name: "Habits", path: "/habits", icon: Target },
    { name: "Daily Planning", path: "/planning", icon: Calendar },
    { name: "Routines", path: "/routines", icon: Repeat },
    { name: "Mood Journal", path: "/mood", icon: Heart },
    { name: "Reminders", path: "/reminders", icon: Bell },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      {/* Mobile Menu Button - Beautiful Floating Design */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsOpen(!isOpen)}
          className="glass-morphism border-wellness-sage/30 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 bg-white/90 backdrop-blur-md rounded-xl p-3"
        >
          {isOpen ? (
            <X className="h-5 w-5 text-wellness-sage-dark" />
          ) : (
            <div className="flex flex-col gap-1">
              <div className="w-5 h-0.5 bg-wellness-sage-dark rounded-full transition-all duration-200"></div>
              <div className="w-4 h-0.5 bg-wellness-sage-dark rounded-full transition-all duration-200"></div>
              <div className="w-3 h-0.5 bg-wellness-sage-dark rounded-full transition-all duration-200"></div>
            </div>
          )}
        </Button>
      </div>

      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/20 backdrop-blur-sm z-40 transition-opacity duration-300"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Navigation Sidebar */}
      <nav className={`
        fixed left-0 top-0 h-full w-64 bg-white/95 backdrop-blur-md border-r border-wellness-sage/20 z-40
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="p-6">
          {/* App Logo and Name */}
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-wellness-sage via-wellness-sky to-wellness-lavender flex items-center justify-center shadow-lg">
              <Sparkles className="h-7 w-7 text-white animate-pulse" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-wellness-sage-dark leading-tight">
                Daily Life
              </h1>
              <h2 className="text-lg font-semibold text-wellness-sky-dark -mt-1">
                Routine
              </h2>
              <p className="text-xs text-wellness-sage-dark/60 mt-0.5">Your Wellness Journey</p>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`
                    flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group
                    ${isActive(item.path) 
                      ? 'bg-gradient-to-r from-wellness-sage/20 to-wellness-sky/20 text-wellness-sage-dark border-l-4 border-wellness-sage shadow-md' 
                      : 'text-wellness-sage-dark/70 hover:bg-gradient-to-r hover:from-wellness-sage/10 hover:to-wellness-sky/10 hover:text-wellness-sage-dark hover:shadow-sm'
                    }
                  `}
                >
                  <Icon className={`h-5 w-5 transition-all duration-200 ${
                    isActive(item.path) 
                      ? 'text-wellness-sage' 
                      : 'group-hover:text-wellness-sage group-hover:scale-110'
                  }`} />
                  <span className="font-medium">{item.name}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Spacer for desktop */}
      <div className="hidden lg:block w-64 flex-shrink-0" />
    </>
  );
};

export default Navigation;
