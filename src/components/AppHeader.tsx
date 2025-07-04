
import { useLocation } from "react-router-dom";

const AppHeader = () => {
  const location = useLocation();
  
  const getPageTitle = () => {
    switch (location.pathname) {
      case "/": return "Dashboard";
      case "/habits": return "Daily Habits";
      case "/planning": return "Daily Planning";
      case "/routines": return "Routines";
      case "/mood": return "Mood Journal";
      case "/reminders": return "Reminders";
      default: return "ZenFlow";
    }
  };

  const getPageDescription = () => {
    switch (location.pathname) {
      case "/": return "Your peaceful wellness overview";
      case "/habits": return "Track your daily wellness habits";
      case "/planning": return "Plan your day mindfully";
      case "/routines": return "Manage your daily routines";
      case "/mood": return "Reflect on your emotional journey";
      case "/reminders": return "Gentle nudges for your wellness";
      default: return "Your wellness companion";
    }
  };

  return (
    <div className="mb-6 lg:mb-8">
      <h1 className="text-2xl lg:text-3xl font-poppins font-bold text-wellness-sage-dark mb-2">
        {getPageTitle()}
      </h1>
      <p className="text-wellness-sage-dark/70 text-sm lg:text-base">
        {getPageDescription()}
      </p>
    </div>
  );
};

export default AppHeader;
