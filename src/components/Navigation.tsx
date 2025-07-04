
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
  Menu,
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
      {/* Mobile Menu Button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsOpen(!isOpen)}
          className="glass-morphism border-wellness-sage/20"
        >
          {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </Button>
      </div>

      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
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
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-wellness-sage to-wellness-sky flex items-center justify-center">
              <Heart className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-poppins font-bold text-wellness-sage-dark">
                ZenFlow
              </h1>
              <p className="text-xs text-wellness-sage-dark/60">Your Wellness Companion</p>
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
                    flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200
                    ${isActive(item.path) 
                      ? 'bg-wellness-sage/20 text-wellness-sage-dark border-l-4 border-wellness-sage' 
                      : 'text-wellness-sage-dark/70 hover:bg-wellness-sage/10 hover:text-wellness-sage-dark'
                    }
                  `}
                >
                  <Icon className={`h-5 w-5 ${isActive(item.path) ? 'text-wellness-sage' : ''}`} />
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
