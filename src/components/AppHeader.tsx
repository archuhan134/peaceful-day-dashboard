
import { useLocation } from "react-router-dom";
import { useTranslations } from "@/hooks/useTranslations";

const AppHeader = () => {
  const location = useLocation();
  const { t } = useTranslations();
  
  const getPageTitle = () => {
    switch (location.pathname) {
      case "/": return "Daily Life Routine";
      case "/habits": return t("habits");
      case "/planning": return t("planning");
      case "/routines": return t("routines");
      case "/mood": return t("mood");
      case "/reminders": return t("reminders");
      case "/profile": return t("profile");
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
      case "/profile": return "Your wellness companion";
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
