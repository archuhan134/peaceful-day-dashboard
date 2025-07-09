
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTranslations } from "@/hooks/useTranslations";
import AppHeader from "@/components/AppHeader";
import BackButton from "@/components/BackButton";
import ProfileHeader from "@/components/profile/ProfileHeader";
import GuestLoginPanel from "@/components/profile/GuestLoginPanel";
import TasksCompletedSection from "@/components/profile/TasksCompletedSection";
import MoodStatsSection from "@/components/profile/MoodStatsSection";
import TaskStatsSection from "@/components/profile/TaskStatsSection";
import MoodHistoryView from "@/components/profile/MoodHistoryView";

const Profile = () => {
  const navigate = useNavigate();
  const { t } = useTranslations();
  const [showMoodHistory, setShowMoodHistory] = useState(false);

  if (showMoodHistory) {
    return (
      <>
        <BackButton />
        <MoodHistoryView onBack={() => setShowMoodHistory(false)} />
      </>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <BackButton />
      <AppHeader />

      <ProfileHeader />

      <GuestLoginPanel />

      {/* Settings Button */}
      <div className="px-4">
        <Button
          onClick={() => navigate('/settings')}
          className="w-full bg-wellness-sage hover:bg-wellness-sage-dark text-white shadow-md hover:shadow-lg transition-all"
        >
          <Settings className="h-4 w-4 mr-2" />
          {t('settings')}
        </Button>
      </div>

      <TasksCompletedSection />

      <MoodStatsSection onShowMoodHistory={() => setShowMoodHistory(true)} />

      <TaskStatsSection />

      {/* Bottom padding for mobile */}
      <div className="h-6"></div>
    </div>
  );
};

export default Profile;
