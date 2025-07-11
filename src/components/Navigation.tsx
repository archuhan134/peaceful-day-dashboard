
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
  User,
  Sparkles,
  X,
  CheckSquare,
  Lightbulb,
  Book
} from "lucide-react";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  // Desktop navigation items
  const navItems = [
    { name: "Dashboard", path: "/", icon: Home },
    { name: "Habits", path: "/habits", icon: Target },
    { name: "Daily Planning", path: "/planning", icon: Calendar },
    { name: "Routines", path: "/routines", icon: Repeat },
    { name: "Mood Journal", path: "/mood", icon: Heart },
    { name: "Reminders", path: "/reminders", icon: Bell },
    { name: "Profile", path: "/profile", icon: User },
  ];

  // Mobile bottom navigation items with modern filled icons
  const bottomNavItems = [
    { name: "Routine", path: "/", icon: CheckSquare },
    { name: "Inspire", path: "/inspire", icon: Lightbulb },
    { name: "Library", path: "/library", icon: Book },
    { name: "Profile", path: "/profile", icon: User },
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

      {/* Desktop Navigation Sidebar */}
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

      {/* Modern Mobile Bottom Navigation */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40">
        <div className="bg-white/95 backdrop-blur-md border-t border-wellness-sage/20 px-2 py-2 rounded-t-3xl shadow-2xl">
          <div className="flex justify-around items-center max-w-md mx-auto">
            {bottomNavItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`flex flex-col items-center gap-1 py-3 px-4 rounded-2xl transition-all duration-300 relative ${
                    active
                      ? 'text-wellness-sage-dark bg-gradient-to-b from-wellness-sage/20 to-wellness-sky/10 scale-110 shadow-lg'
                      : 'text-wellness-sage-dark/60 hover:text-wellness-sage-dark hover:bg-wellness-sage/5 hover:scale-105'
                  }`}
                >
                  {/* Active indicator */}
                  {active && (
                    <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-gradient-to-r from-wellness-sage to-wellness-sky rounded-full shadow-md" />
                  )}
                  
                  <Icon 
                    className={`h-6 w-6 transition-all duration-300 ${
                      active 
                        ? 'text-wellness-sage drop-shadow-sm' 
                        : 'group-hover:text-wellness-sage'
                    }`} 
                    fill={active ? "currentColor" : "none"}
                    strokeWidth={active ? 1.5 : 2}
                  />
                  <span className={`text-xs font-medium transition-all duration-300 ${
                    active 
                      ? 'text-wellness-sage-dark font-semibold' 
                      : 'text-wellness-sage-dark/70'
                  }`}>
                    {item.name}
                  </span>
                  
                  {/* Glow effect for active tab */}
                  {active && (
                    <div className="absolute inset-0 bg-gradient-to-r from-wellness-sage/10 to-wellness-sky/10 rounded-2xl blur-xl -z-10" />
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* Spacer for desktop */}
      <div className="hidden lg:block w-64 flex-shrink-0" />
      
      {/* Spacer for mobile bottom navigation */}
      <div className="lg:hidden h-20" />
    </>
  );
};

export default Navigation;
