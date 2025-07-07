
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ArrowLeft, User, Bell, Globe, RotateCcw, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { toast } from "sonner";

const Settings = () => {
  const navigate = useNavigate();
  const [selectedLanguage, setSelectedLanguage] = useLocalStorage("appLanguage", "English");
  const [showLanguageDialog, setShowLanguageDialog] = useState(false);
  const [showResetDialog, setShowResetDialog] = useState(false);

  const languages = [
    "English",
    "Hindi",
    "Spanish",
    "French", 
    "German",
    "Portuguese",
    "Italian",
    "Japanese",
    "Korean",
    "Chinese"
  ];

  const handleLanguageSelect = (language: string) => {
    setSelectedLanguage(language);
    setShowLanguageDialog(false);
    toast.success(`Language changed to ${language}`);
  };

  const handleResetRoutine = () => {
    // Clear all routine-related data from localStorage
    localStorage.removeItem("habits");
    localStorage.removeItem("tasks");
    localStorage.removeItem("routines");
    localStorage.removeItem("reminders");
    localStorage.removeItem("upcomingTasks");
    localStorage.removeItem("moodCalendarData");
    localStorage.removeItem("taskCalendarData");
    localStorage.removeItem("dayStreak");
    localStorage.removeItem("tasksCompleted");
    localStorage.removeItem("todayMood");
    localStorage.removeItem("wellnessRating");
    localStorage.removeItem("wellnessReflection");
    
    setShowResetDialog(false);
    toast.success("All routine data has been reset successfully!");
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center gap-4 px-4 pt-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate(-1)}
          className="hover:bg-wellness-sage/10"
        >
          <ArrowLeft className="h-5 w-5 text-wellness-sage-dark" />
        </Button>
        <h1 className="text-2xl font-bold text-wellness-sage-dark">Settings</h1>
      </div>

      {/* Account Section */}
      <div className="px-4">
        <h2 className="text-lg font-semibold text-wellness-sage-dark mb-4">Account</h2>
        
        <Card className="glass-morphism border-wellness-sage/20 mb-4">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-wellness-sage/20">
                  <User className="h-5 w-5 text-wellness-sage-dark" />
                </div>
                <span className="font-medium text-wellness-sage-dark">Account</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-wellness-sage-dark/70">Unregistered</span>
                <ChevronRight className="h-4 w-4 text-wellness-sage-dark/50" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-morphism border-wellness-sky/20 mb-4">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-wellness-sky/20">
                  <Bell className="h-5 w-5 text-wellness-sky-dark" />
                </div>
                <span className="font-medium text-wellness-sage-dark">Notifications</span>
              </div>
              <ChevronRight className="h-4 w-4 text-wellness-sage-dark/50" />
            </div>
          </CardContent>
        </Card>

        <Card className="glass-morphism border-wellness-lavender/20 mb-4">
          <CardContent className="p-4">
            <div 
              className="flex items-center justify-between cursor-pointer"
              onClick={() => setShowLanguageDialog(true)}
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-wellness-lavender/20">
                  <Globe className="h-5 w-5 text-wellness-lavender-dark" />
                </div>
                <span className="font-medium text-wellness-sage-dark">Change app language</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-wellness-sage-dark/70">{selectedLanguage}</span>
                <ChevronRight className="h-4 w-4 text-wellness-sage-dark/50" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-morphism border-wellness-peach/20">
          <CardContent className="p-4">
            <div 
              className="flex items-center justify-between cursor-pointer"
              onClick={() => setShowResetDialog(true)}
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-wellness-peach/20">
                  <RotateCcw className="h-5 w-5 text-wellness-peach-dark" />
                </div>
                <span className="font-medium text-wellness-sage-dark">Reset entire routine</span>
              </div>
              <ChevronRight className="h-4 w-4 text-wellness-sage-dark/50" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Language Selection Dialog */}
      <Dialog open={showLanguageDialog} onOpenChange={setShowLanguageDialog}>
        <DialogContent className="glass-morphism border-wellness-lavender/30">
          <DialogHeader>
            <DialogTitle className="text-wellness-sage-dark">Select Language</DialogTitle>
            <DialogDescription className="text-wellness-sage-dark/70">
              Choose your preferred language for the app
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-2 max-h-96 overflow-y-auto">
            {languages.map((language) => (
              <Button
                key={language}
                variant={selectedLanguage === language ? "default" : "outline"}
                className={`justify-start h-12 ${
                  selectedLanguage === language 
                    ? "bg-wellness-lavender hover:bg-wellness-lavender-dark text-white" 
                    : "hover:bg-wellness-lavender/10"
                }`}
                onClick={() => handleLanguageSelect(language)}
              >
                {language}
              </Button>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      {/* Reset Confirmation Dialog */}
      <Dialog open={showResetDialog} onOpenChange={setShowResetDialog}>
        <DialogContent className="glass-morphism border-wellness-peach/30">
          <DialogHeader>
            <DialogTitle className="text-wellness-sage-dark">Reset Entire Routine</DialogTitle>
            <DialogDescription className="text-wellness-sage-dark/70">
              Are you sure you want to reset your routine? This will clear all your habits, tasks, routines, reminders, and progress data. This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <div className="flex gap-3 mt-6">
            <Button
              variant="outline"
              onClick={() => setShowResetDialog(false)}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              onClick={handleResetRoutine}
              className="flex-1 bg-wellness-peach hover:bg-wellness-peach-dark text-white"
            >
              Reset All Data
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Bottom padding for mobile */}
      <div className="h-6"></div>
    </div>
  );
};

export default Settings;
