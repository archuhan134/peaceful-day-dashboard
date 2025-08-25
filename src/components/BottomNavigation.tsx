import { Home, Target, CheckSquare, Grid3X3, Clock } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

export const BottomNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { icon: Home, label: "Today", path: "/" },
    { icon: Target, label: "Habits", path: "/habits" },
    { icon: CheckSquare, label: "Tasks", path: "/planning" },
    { icon: Grid3X3, label: "Categories", path: "/library" },
    { icon: Clock, label: "Timer", path: "/reminders" },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border">
      <div className="flex items-center justify-around py-2">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;
          
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`flex flex-col items-center py-2 px-3 rounded-lg transition-colors ${
                isActive 
                  ? 'text-accent-pink' 
                  : 'text-text-gray hover:text-foreground'
              }`}
            >
              <Icon className="w-6 h-6 mb-1" />
              <span className="text-xs font-medium">{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};