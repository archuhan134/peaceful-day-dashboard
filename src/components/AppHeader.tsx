
import { useLocation } from "react-router-dom";

const AppHeader = () => {
  const location = useLocation();
  
  const getPageTitle = () => {
    switch (location.pathname) {
      case "/": return "Daily Life Routine";
      case "/habits": return "Daily Habits";
      case "/planning": return "Daily Planning";
      case "/routines": return "Routines";
      case "/mood": return "Mood Journal";
      case "/reminders": return "Reminders";
      default: return "Daily Life Routine";
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
    <div className="mb-6 lg:mb-8 text-center px-4">
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-wellness-sage-dark via-wellness-sky-dark to-wellness-lavender-dark bg-clip-text text-transparent mb-3 tracking-tight mx-auto max-w-4xl">
        {getPageTitle()}
      </h1>
      <p className="text-wellness-sage-dark/70 text-sm sm:text-base lg:text-lg font-medium mx-auto max-w-2xl">
        {getPageDescription()}
      </p>
    </div>
  );
};

export default AppHeader;
