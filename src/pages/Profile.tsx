import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { User, ChevronRight, Star, CheckCircle, Settings, ArrowLeft } from "lucide-react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useNavigate } from "react-router-dom";
import AppHeader from "@/components/AppHeader";

interface MoodEntry {
  id: string;
  mood: string;
  name: string;
  date: string;
  time: string;
  dateKey: string;
  description?: string;
}

const Profile = () => {
  const navigate = useNavigate();
  const [selectedMoodDate, setSelectedMoodDate] = useState<Date | undefined>();
  const [selectedTaskDate, setSelectedTaskDate] = useState<Date | undefined>();
  const [showMoodHistory, setShowMoodHistory] = useState(false);
  
  // Local storage for mood and task data - read from localStorage directly
  const [moodData, setMoodData] = useState<Record<string, string>>(() => {
    try {
      return JSON.parse(localStorage.getItem("moodCalendarData") || "{}");
    } catch {
      return {};
    }
  });
  
  const [moodHistory, setMoodHistory] = useState<MoodEntry[]>(() => {
    try {
      return JSON.parse(localStorage.getItem("moodHistory") || "[]");
    } catch {
      return [];
    }
  });
  
  const [taskData, setTaskData] = useLocalStorage<Record<string, boolean>>("taskCalendarData", {});
  const [dayStreak, setDayStreak] = useLocalStorage("dayStreak", 0);
  const [tasksCompleted, setTasksCompleted] = useLocalStorage("tasksCompleted", 0);

  // Update state when localStorage changes
  useState(() => {
    const handleStorageChange = () => {
      try {
        setMoodData(JSON.parse(localStorage.getItem("moodCalendarData") || "{}"));
        setMoodHistory(JSON.parse(localStorage.getItem("moodHistory") || "[]"));
      } catch (error) {
        console.error("Error reading mood data:", error);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  });

  // Mood options with names
  const moodOptions = [
    { emoji: "😊", name: "Happy" },
    { emoji: "😌", name: "Calm" },
    { emoji: "😰", name: "Stressed" },
    { emoji: "😞", name: "Sad" },
    { emoji: "🥳", name: "Excited" },
    { emoji: "😴", name: "Tired" },
    { emoji: "🤔", name: "Thoughtful" },
    { emoji: "😇", name: "Peaceful" }
  ];

  const formatDateKey = (date: Date) => {
    return date.toISOString().split('T')[0];
  };

  const formatDisplayDate = (date: Date) => {
    return date.toLocaleDateString('en-GB');
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const handleMoodSelect = (mood: { emoji: string; name: string }) => {
    if (selectedMoodDate) {
      const dateKey = formatDateKey(selectedMoodDate);
      const now = new Date();
      
      // Save mood to calendar data
      const updatedMoodData = {
        ...moodData,
        [dateKey]: mood.emoji
      };
      setMoodData(updatedMoodData);
      localStorage.setItem("moodCalendarData", JSON.stringify(updatedMoodData));

      // Save detailed mood entry to history
      const newMoodEntry: MoodEntry = {
        id: Date.now().toString(),
        mood: mood.emoji,
        name: mood.name,
        date: selectedMoodDate.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
        time: now.toLocaleTimeString('en-US', { 
          hour: 'numeric', 
          minute: '2-digit',
          hour12: true 
        }),
        dateKey: dateKey,
        description: ""
      };

      const updatedHistory = [newMoodEntry, ...moodHistory.filter(entry => entry.dateKey !== dateKey)];
      setMoodHistory(updatedHistory);
      localStorage.setItem("moodHistory", JSON.stringify(updatedHistory));
      
      setSelectedMoodDate(undefined);
    }
  };

  const handleTaskToggle = () => {
    if (selectedTaskDate) {
      const dateKey = formatDateKey(selectedTaskDate);
      setTaskData(prev => ({
        ...prev,
        [dateKey]: !prev[dateKey]
      }));
      setSelectedTaskDate(undefined);
    }
  };

  const getMoodForDate = (date: Date) => {
    const dateKey = formatDateKey(date);
    return moodData[dateKey];
  };

  const getTaskStatusForDate = (date: Date) => {
    const dateKey = formatDateKey(date);
    return taskData[dateKey];
  };

  const renderMoodDay = (date: Date) => {
    const mood = getMoodForDate(date);
    const isSelected = selectedMoodDate && formatDateKey(selectedMoodDate) === formatDateKey(date);
    
    return (
      <div className={`relative w-full h-full flex flex-col items-center justify-center p-1 ${isSelected ? 'bg-wellness-sage/20 rounded-full' : ''}`}>
        {mood ? (
          <span className="text-xl">{mood}</span>
        ) : (
          <span className="text-sm">{date.getDate()}</span>
        )}
      </div>
    );
  };

  const renderTaskDay = (date: Date) => {
    const hasTask = getTaskStatusForDate(date);
    const isSelected = selectedTaskDate && formatDateKey(selectedTaskDate) === formatDateKey(date);
    
    return (
      <div className={`relative w-full h-full flex items-center justify-center ${isSelected ? 'bg-wellness-lavender/20 rounded-full' : ''}`}>
        <span className="text-sm">{date.getDate()}</span>
        {hasTask && (
          <div className="absolute -top-1 -right-1 w-2 h-2 bg-wellness-lavender rounded-full"></div>
        )}
      </div>
    );
  };

  if (showMoodHistory) {
    return (
      <div className="space-y-6 animate-fade-in">
        <div className="flex items-center gap-4 px-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setShowMoodHistory(false)}
            className="hover:bg-wellness-sage/10"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-bold text-wellness-sage-dark">All Moods</h1>
        </div>

        <div className="px-4 space-y-4">
          {moodHistory.length === 0 ? (
            <Card className="glass-morphism border-wellness-sage/20">
              <CardContent className="p-8 text-center">
                <p className="text-wellness-sage-dark/70">No mood entries yet. Start tracking your moods to see them here!</p>
              </CardContent>
            </Card>
          ) : (
            moodHistory.map((entry) => (
              <Card key={entry.id} className="glass-morphism border-wellness-sage/20">
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    <div className="text-3xl">{entry.mood}</div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-wellness-sage-dark">{entry.name}</h3>
                      <p className="text-sm text-wellness-sage-dark/70">
                        {entry.date} • {entry.time}
                      </p>
                      {entry.description && (
                        <p className="text-sm text-wellness-sage-dark/80 mt-1">{entry.description}</p>
                      )}
                    </div>
                    <Badge className="bg-wellness-sage/20 text-wellness-sage-dark border-wellness-sage/30">
                      Brave
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <AppHeader />

      {/* Profile Header */}
      <div className="flex items-start gap-4 px-4">
        <Avatar className="w-16 h-16">
          <AvatarFallback className="bg-wellness-sage/20">
            <User className="h-8 w-8 text-wellness-sage-dark" />
          </AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-wellness-sage-dark mb-2">Profile</h1>
        </div>
      </div>

      {/* Guest Login Panel */}
      <Card className="glass-morphism border-wellness-sage/20 mx-4">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-wellness-sage-dark mb-1">Sign up or log in</h3>
              <p className="text-sm text-wellness-sage-dark/70">You are currently in guest mode</p>
            </div>
            <ChevronRight className="h-5 w-5 text-wellness-sage-dark/50" />
          </div>
        </CardContent>
      </Card>

      {/* Settings Button */}
      <div className="px-4">
        <Button
          onClick={() => navigate('/settings')}
          className="w-full bg-wellness-sage hover:bg-wellness-sage-dark text-white shadow-md hover:shadow-lg transition-all"
        >
          <Settings className="h-4 w-4 mr-2" />
          Settings
        </Button>
      </div>

      {/* Streak & Tasks Count */}
      <div className="grid grid-cols-2 gap-4 px-4">
        <Card className="glass-morphism border-wellness-sky/20 text-center">
          <CardContent className="p-4">
            <div className="flex items-center justify-center gap-1 mb-2">
              <span className="text-2xl font-bold text-wellness-sky-dark">{dayStreak}</span>
              <Star className="h-4 w-4 text-wellness-sky fill-wellness-sky" />
            </div>
            <p className="text-sm text-wellness-sage-dark">day streak</p>
          </CardContent>
        </Card>

        <Card className="glass-morphism border-wellness-peach/20 text-center">
          <CardContent className="p-4">
            <div className="flex items-center justify-center gap-1 mb-2">
              <span className="text-2xl font-bold text-wellness-peach-dark">{tasksCompleted}</span>
              <CheckCircle className="h-4 w-4 text-wellness-peach fill-wellness-peach" />
            </div>
            <p className="text-sm text-wellness-sage-dark">task completed</p>
          </CardContent>
        </Card>
      </div>

      {/* Mood Stats Calendar */}
      <Card className="glass-morphism border-wellness-sage/20 mx-4">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-wellness-sage-dark">Mood Stats</CardTitle>
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-wellness-sage-dark/70"
              onClick={() => setShowMoodHistory(true)}
            >
              View All
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Calendar
            mode="single"
            selected={selectedMoodDate}
            onSelect={setSelectedMoodDate}
            className="w-full"
            components={{
              Day: ({ date }) => renderMoodDay(date)
            }}
          />
          
          {selectedMoodDate && (
            <div className="mt-4 p-4 bg-wellness-sage/10 rounded-lg">
              <p className="text-sm font-medium text-wellness-sage-dark mb-3">
                Select mood for {selectedMoodDate.toDateString()}:
              </p>
              <div className="grid grid-cols-4 gap-2">
                {moodOptions.map((option) => (
                  <Button
                    key={option.emoji}
                    variant="outline"
                    size="sm"
                    onClick={() => handleMoodSelect(option)}
                    className="h-12 flex flex-col gap-1 text-xs hover:bg-wellness-sage/20"
                  >
                    <span className="text-lg">{option.emoji}</span>
                    <span className="text-xs">{option.name}</span>
                  </Button>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Task Stats Calendar */}
      <Card className="glass-morphism border-wellness-lavender/20 mx-4">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-wellness-lavender-dark">Task Stats</CardTitle>
            <Button variant="ghost" size="sm" className="text-wellness-lavender-dark/70">
              View All
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Calendar
            mode="single"
            selected={selectedTaskDate}
            onSelect={setSelectedTaskDate}
            className="w-full"
            components={{
              Day: ({ date }) => renderTaskDay(date)
            }}
          />
          
          {selectedTaskDate && (
            <div className="mt-4 p-4 bg-wellness-lavender/10 rounded-lg">
              <p className="text-sm font-medium text-wellness-lavender-dark mb-3">
                {selectedTaskDate.toDateString()}
              </p>
              <Button
                onClick={handleTaskToggle}
                className={`w-full ${
                  getTaskStatusForDate(selectedTaskDate)
                    ? 'bg-wellness-lavender hover:bg-wellness-lavender-dark'
                    : 'bg-wellness-sage hover:bg-wellness-sage-dark'
                } text-white`}
              >
                {getTaskStatusForDate(selectedTaskDate) ? 'Mark as Incomplete' : 'Mark as Complete'}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Bottom padding for mobile */}
      <div className="h-6"></div>
    </div>
  );
};

export default Profile;
