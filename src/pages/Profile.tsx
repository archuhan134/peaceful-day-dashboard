
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { User, ChevronRight, Star, CheckCircle } from "lucide-react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import AppHeader from "@/components/AppHeader";

const Profile = () => {
  const [selectedMoodDate, setSelectedMoodDate] = useState<Date | undefined>();
  const [selectedTaskDate, setSelectedTaskDate] = useState<Date | undefined>();
  
  // Local storage for mood and task data
  const [moodData, setMoodData] = useLocalStorage<Record<string, string>>("moodCalendarData", {});
  const [taskData, setTaskData] = useLocalStorage<Record<string, boolean>>("taskCalendarData", {});
  const [dayStreak, setDayStreak] = useLocalStorage("dayStreak", 0);
  const [tasksCompleted, setTasksCompleted] = useLocalStorage("tasksCompleted", 0);

  // Mood options
  const moodOptions = ["😊", "😐", "😞", "🥳", "😴", "😤", "🤔", "😇"];

  const formatDateKey = (date: Date) => {
    return date.toISOString().split('T')[0];
  };

  const handleMoodSelect = (mood: string) => {
    if (selectedMoodDate) {
      const dateKey = formatDateKey(selectedMoodDate);
      setMoodData(prev => ({
        ...prev,
        [dateKey]: mood
      }));
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
      <div className={`relative w-full h-full flex items-center justify-center ${isSelected ? 'bg-wellness-sage/20 rounded-full' : ''}`}>
        <span className="text-sm">{date.getDate()}</span>
        {mood && (
          <span className="absolute -top-1 -right-1 text-xs">{mood}</span>
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

      {/* Explore Tips Banner */}
      <Card className="glass-morphism border-wellness-lavender/20 mx-4 bg-gradient-to-r from-wellness-sky/10 to-wellness-lavender/10">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-wellness-sage-dark mb-1">Explore more</h3>
              <p className="text-sm text-wellness-sage-dark/70 mb-3">tips about Me+</p>
              <Button size="sm" className="bg-white/80 text-wellness-sage-dark hover:bg-white/90">
                Learn more
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
            <div className="w-16 h-12 bg-wellness-sage/20 rounded-lg flex items-center justify-center">
              <span className="text-xs">📱</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Mood Stats Calendar */}
      <Card className="glass-morphism border-wellness-sage/20 mx-4">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-wellness-sage-dark">Mood Stats</CardTitle>
            <Button variant="ghost" size="sm" className="text-wellness-sage-dark/70">
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
          />
          
          {selectedMoodDate && (
            <div className="mt-4 p-4 bg-wellness-sage/10 rounded-lg">
              <p className="text-sm font-medium text-wellness-sage-dark mb-3">
                Select mood for {selectedMoodDate.toDateString()}:
              </p>
              <div className="grid grid-cols-4 gap-2">
                {moodOptions.map((mood) => (
                  <Button
                    key={mood}
                    variant="outline"
                    size="sm"
                    onClick={() => handleMoodSelect(mood)}
                    className="h-10 text-lg hover:bg-wellness-sage/20"
                  >
                    {mood}
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
