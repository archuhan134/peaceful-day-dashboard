
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Heart, Calendar, List, Target, CheckCircle, Repeat, Bell, Sparkles, Sun, Moon, Save, User, Plus } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { MoodSelector } from "@/components/dashboard/MoodSelector";
import { CreateTaskDialog } from "@/components/dashboard/CreateTaskDialog";
import AppHeader from "@/components/AppHeader";
import { toast } from "sonner";

const Index = () => {
  const navigate = useNavigate();
  
  // State for panel visibility
  const [showMoodSelector, setShowMoodSelector] = useState(false);
  const [showCreateTask, setShowCreateTask] = useState(false);

  // LocalStorage states
  const [todayMood, setTodayMood] = useLocalStorage("todayMood", "😊");
  const [wellnessRating, setWellnessRating] = useLocalStorage("wellnessRating", 0);
  const [wellnessReflection, setWellnessReflection] = useLocalStorage("wellnessReflection", "");
  
  const [habits] = useLocalStorage("habits", [
    { id: "1", name: "Morning meditation", completed: false, streak: 3 },
    { id: "2", name: "Drink 8 glasses of water", completed: false, streak: 7 },
    { id: "3", name: "Exercise for 30 minutes", completed: false, streak: 1 },
    { id: "4", name: "Read for 20 minutes", completed: false, streak: 5 },
    { id: "5", name: "Practice gratitude", completed: false, streak: 2 }
  ]);

  const [tasks] = useLocalStorage("tasks", [
    { id: "1", name: "Review weekly goals", completed: false },
    { id: "2", name: "Team meeting prep", completed: false },
    { id: "3", name: "Grocery shopping", completed: false },
    { id: "4", name: "Call family", completed: false }
  ]);

  const [routines] = useLocalStorage("routines", [
    { id: "1", name: "Morning skincare", completed: false, time: "7:00 AM", type: "morning" },
    { id: "2", name: "Evening wind-down", completed: false, time: "9:00 PM", type: "evening" },
    { id: "3", name: "Workout preparation", completed: false, time: "6:00 AM", type: "morning" },
    { id: "4", name: "Bedtime reading", completed: false, time: "10:00 PM", type: "evening" }
  ]);

  const [reminders] = useLocalStorage("reminders", []);

  const [upcomingTasks, setUpcomingTasks] = useLocalStorage("upcomingTasks", [
    { id: 1, task: "Morning meditation", time: "8:00 AM", completed: false },
    { id: 2, task: "Drink water", time: "9:00 AM", completed: false },
    { id: 3, task: "Review goals", time: "10:00 AM", completed: false },
    { id: 4, task: "Exercise", time: "6:00 PM", completed: false },
  ]);

  // Calculated values
  const completedHabits = habits.filter(h => h.completed).length;
  const totalHabits = habits.length;
  const completedTasks = tasks.filter(t => t.completed).length;
  const totalTasks = tasks.length;
  const completedRoutines = routines.filter(r => r.completed).length;
  const activeReminders = reminders.filter(r => r.active).length;

  // Event handlers
  const handleMoodSelect = (mood: string) => {
    setTodayMood(mood);
    
    // Save detailed mood entry to mood history
    const now = new Date();
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
    
    const selectedMoodData = moodOptions.find(m => m.emoji === mood);
    
    const moodEntry = {
      id: Date.now().toString(),
      mood: mood,
      name: selectedMoodData?.name || "Unknown",
      date: now.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      time: now.toLocaleTimeString('en-US', { 
        hour: 'numeric', 
        minute: '2-digit',
        hour12: true 
      }),
      dateKey: now.toISOString().split('T')[0] // For calendar mapping
    };
    
    // Save to mood history
    const existingHistory = JSON.parse(localStorage.getItem("moodHistory") || "[]");
    const updatedHistory = [moodEntry, ...existingHistory.filter((entry: any) => entry.dateKey !== moodEntry.dateKey)];
    localStorage.setItem("moodHistory", JSON.stringify(updatedHistory));
    
    // Save to mood calendar data for Profile page
    const existingMoodData = JSON.parse(localStorage.getItem("moodCalendarData") || "{}");
    existingMoodData[moodEntry.dateKey] = mood;
    localStorage.setItem("moodCalendarData", JSON.stringify(existingMoodData));
  };

  const handleUpcomingTaskToggle = (id: number) => {
    setUpcomingTasks(prev => prev.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const handleWellnessRating = (rating: number) => {
    setWellnessRating(rating);
  };

  const handleSaveReflection = () => {
    if (wellnessReflection.trim()) {
      toast.success("Reflection saved successfully!");
    } else {
      toast.error("Please write something before saving");
    }
  };

  const handleCreateTask = (newTask: any) => {
    // Add the new task to the tasks list
    const existingTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    const updatedTasks = [...existingTasks, newTask];
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    
    // Also add to upcoming tasks if it's for today
    if (newTask.date === "Today") {
      const existingUpcoming = JSON.parse(localStorage.getItem("upcomingTasks") || "[]");
      const upcomingTask = {
        id: parseInt(newTask.id),
        task: newTask.name,
        time: newTask.time === "Anytime" ? "Anytime" : newTask.time,
        completed: false
      };
      const updatedUpcoming = [...existingUpcoming, upcomingTask];
      localStorage.setItem("upcomingTasks", JSON.stringify(updatedUpcoming));
      setUpcomingTasks(updatedUpcoming);
    }
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return { text: "Good Morning", icon: Sun };
    if (hour < 18) return { text: "Good Afternoon", icon: Sun };
    return { text: "Good Evening", icon: Moon };
  };

  const greeting = getGreeting();
  const GreetingIcon = greeting.icon;

  return (
    <div className="space-y-6 lg:space-y-8 animate-fade-in relative">
      {/* Header with centered title and navigation icons */}
      <div className="flex items-center justify-center px-4 relative">
        <div className="text-center">
          <h1 className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-wellness-sage-dark via-wellness-sky-dark to-wellness-lavender-dark bg-clip-text text-transparent mb-1">
            Daily Life Routine
          </h1>
          <p className="text-wellness-sage-dark/70 text-sm lg:text-base">
            Your peaceful wellness overview
          </p>
        </div>
        
        {/* Navigation icons positioned above the bottom navigation */}
        <div className="fixed bottom-20 right-4 flex flex-col gap-3 z-50">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setShowCreateTask(true)}
            className="bg-wellness-sage hover:bg-wellness-sage-dark text-white border-0 w-12 h-12 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
          >
            <Plus className="h-6 w-6" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => navigate('/profile')}
            className="glass-morphism border-wellness-sage/30 hover:bg-wellness-sage/10 w-12 h-12 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
          >
            <User className="h-5 w-5 text-wellness-sage-dark" />
          </Button>
        </div>
      </div>

      {/* Welcome Section */}
      <div className="text-center space-y-4 mb-8 px-4">
        <div className="flex items-center justify-center gap-3 mb-4">
          <GreetingIcon className="h-8 w-8 text-wellness-peach animate-pulse" />
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-poppins font-bold text-wellness-sage-dark">
            {greeting.text}!
          </h2>
        </div>
        <p className="text-base lg:text-lg text-wellness-sage-dark/80 max-w-2xl mx-auto leading-relaxed">
          Ready to make today amazing? Let's check in on your wellness journey ✨
        </p>
      </div>

      {/* Quick Stats Grid - Added relative positioning */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 relative z-10">
        <div className="relative">
          <Card 
            className="glass-morphism border-wellness-sage/30 hover:shadow-xl transition-all duration-300 cursor-pointer group hover:scale-105 hover:border-wellness-sage/50"
            onClick={() => setShowMoodSelector(!showMoodSelector)}
          >
            <CardContent className="p-4 lg:p-6 text-center">
              <div className="flex items-center justify-center gap-2 mb-3">
                <div className="text-3xl lg:text-4xl group-hover:scale-110 transition-transform duration-200">{todayMood}</div>
              </div>
              <p className="text-sm lg:text-base font-medium text-wellness-sage-dark">Today's Mood</p>
              <p className="text-xs text-wellness-sage-dark/60 mt-1">Click to change</p>
            </CardContent>
          </Card>
          <MoodSelector
            currentMood={todayMood}
            onMoodSelect={handleMoodSelect}
            isOpen={showMoodSelector}
            onClose={() => setShowMoodSelector(false)}
          />
        </div>

        <Card 
          className="glass-morphism border-wellness-sky/30 hover:shadow-xl transition-all duration-300 cursor-pointer group hover:scale-105 hover:border-wellness-sky/50"
          onClick={() => navigate('/habits')}
        >
          <CardContent className="p-4 lg:p-6 text-center">
            <div className="flex items-center justify-center gap-2 mb-3">
              <Target className="h-5 w-5 text-wellness-sky-dark group-hover:scale-110 transition-transform duration-200" />
              <div className="text-2xl lg:text-3xl font-bold text-wellness-sky-dark">
                {completedHabits}/{totalHabits}
              </div>
            </div>
            <p className="text-sm lg:text-base font-medium text-wellness-sage-dark">Habits Complete</p>
            <div className="w-full bg-wellness-sky/20 rounded-full h-2 mt-2">
              <div 
                className="bg-wellness-sky h-2 rounded-full transition-all duration-500"
                style={{ width: `${totalHabits > 0 ? (completedHabits / totalHabits) * 100 : 0}%` }}
              />
            </div>
          </CardContent>
        </Card>

        <Card 
          className="glass-morphism border-wellness-lavender/30 hover:shadow-xl transition-all duration-300 cursor-pointer group hover:scale-105 hover:border-wellness-lavender/50"
          onClick={() => navigate('/planning')}
        >
          <CardContent className="p-4 lg:p-6 text-center">
            <div className="flex items-center justify-center gap-2 mb-3">
              <CheckCircle className="h-5 w-5 text-wellness-lavender-dark group-hover:scale-110 transition-transform duration-200" />
              <div className="text-2xl lg:text-3xl font-bold text-wellness-lavender-dark">
                {totalTasks - completedTasks}
              </div>
            </div>
            <p className="text-sm lg:text-base font-medium text-wellness-sage-dark">Tasks Pending</p>
            <p className="text-xs text-wellness-lavender-dark/70 mt-1">{completedTasks} completed</p>
          </CardContent>
        </Card>

        <Card 
          className="glass-morphism border-wellness-peach/30 hover:shadow-xl transition-all duration-300 cursor-pointer group hover:scale-105 hover:border-wellness-peach/50"
          onClick={() => navigate('/routines')}
        >
          <CardContent className="p-4 lg:p-6 text-center">
            <div className="flex items-center justify-center gap-2 mb-3">
              <Repeat className="h-5 w-5 text-wellness-peach-dark group-hover:scale-110 transition-transform duration-200" />
              <div className="text-2xl lg:text-3xl font-bold text-wellness-peach-dark">
                {completedRoutines}
              </div>
            </div>
            <p className="text-sm lg:text-base font-medium text-wellness-sage-dark">Routines Done</p>
            <p className="text-xs text-wellness-peach-dark/70 mt-1">Keep it up!</p>
          </CardContent>
        </Card>
      </div>

      {/* Navigation Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card 
          className="glass-morphism border-wellness-sky/20 hover:shadow-xl transition-all duration-300 cursor-pointer group hover:scale-[1.02]"
          onClick={() => navigate('/habits')}
        >
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-3 text-wellness-sky-dark group-hover:text-wellness-sky">
              <div className="p-2 rounded-lg bg-wellness-sky/20 group-hover:bg-wellness-sky/30 transition-colors">
                <Target className="h-5 w-5" />
              </div>
              Daily Habits
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-wellness-sage-dark/70 mb-4 leading-relaxed">
              Build lasting habits that nurture your mind, body, and soul
            </p>
            <Button className="w-full bg-wellness-sky hover:bg-wellness-sky-dark text-white shadow-md hover:shadow-lg transition-all">
              <Sparkles className="h-4 w-4 mr-2" />
              Track Habits
            </Button>
          </CardContent>
        </Card>

        <Card 
          className="glass-morphism border-wellness-peach/20 hover:shadow-xl transition-all duration-300 cursor-pointer group hover:scale-[1.02]"
          onClick={() => navigate('/routines')}
        >
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-3 text-wellness-peach-dark group-hover:text-wellness-peach">
              <div className="p-2 rounded-lg bg-wellness-peach/20 group-hover:bg-wellness-peach/30 transition-colors">
                <Repeat className="h-5 w-5" />
              </div>
              Daily Routines
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-wellness-sage-dark/70 mb-4 leading-relaxed">
              Create peaceful morning and evening rituals
            </p>
            <Button className="w-full bg-wellness-peach hover:bg-wellness-peach-dark text-white shadow-md hover:shadow-lg transition-all">
              <Sun className="h-4 w-4 mr-2" />
              Manage Routines
            </Button>
          </CardContent>
        </Card>

        <Card 
          className="glass-morphism border-wellness-lavender/20 hover:shadow-xl transition-all duration-300 cursor-pointer group hover:scale-[1.02]"
          onClick={() => navigate('/reminders')}
        >
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-3 text-wellness-lavender-dark group-hover:text-wellness-lavender">
              <div className="p-2 rounded-lg bg-wellness-lavender/20 group-hover:bg-wellness-lavender/30 transition-colors">
                <Bell className="h-5 w-5" />
              </div>
              Gentle Reminders
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-4">
              <p className="text-wellness-sage-dark/70 leading-relaxed">
                Mindful nudges for your wellness
              </p>
              {activeReminders > 0 && (
                <Badge className="bg-wellness-lavender/20 text-wellness-lavender-dark border-wellness-lavender/30">
                  {activeReminders} active
                </Badge>
              )}
            </div>
            <Button className="w-full bg-wellness-lavender hover:bg-wellness-lavender-dark text-white shadow-md hover:shadow-lg transition-all">
              <Bell className="h-4 w-4 mr-2" />
              Set Reminders
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
        {/* Today's Schedule */}
        <Card className="glass-morphism border-wellness-sage/20 shadow-xl hover:shadow-2xl transition-all duration-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-wellness-sage-dark">
              <div className="p-2 rounded-lg bg-wellness-sage/20">
                <Calendar className="h-5 w-5" />
              </div>
              Today's Flow
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {upcomingTasks.map((task) => (
              <div
                key={task.id}
                className={`flex items-center justify-between p-4 rounded-xl transition-all hover:scale-[1.01] ${
                  task.completed
                    ? "bg-wellness-sage/10 opacity-75 border border-wellness-sage/20"
                    : "bg-wellness-sky/10 hover:bg-wellness-sky/20 border border-transparent hover:border-wellness-sky/30"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Checkbox
                    checked={task.completed}
                    onCheckedChange={() => handleUpcomingTaskToggle(task.id)}
                    className="data-[state=checked]:bg-wellness-sage data-[state=checked]:border-wellness-sage"
                  />
                  <span
                    className={`font-medium ${task.completed ? "line-through text-wellness-sage-dark/60" : "text-wellness-sage-dark"}`}
                  >
                    {task.task}
                  </span>
                </div>
                <Badge
                  variant="outline"
                  className={`font-medium ${
                    task.completed
                      ? "border-wellness-sage text-wellness-sage bg-wellness-sage/10"
                      : "border-wellness-sky text-wellness-sky-dark bg-wellness-sky/10"
                  }`}
                >
                  {task.time}
                </Badge>
              </div>
            ))}
            <Button 
              className="w-full mt-6 bg-wellness-sage hover:bg-wellness-sage-dark text-white shadow-md hover:shadow-lg transition-all"
              onClick={() => navigate('/habits')}
            >
              <List className="h-4 w-4 mr-2" />
              View All Tasks
            </Button>
          </CardContent>
        </Card>

        {/* Wellness Check-in */}
        <Card 
          className="glass-morphism border-wellness-lavender/20 cursor-pointer hover:shadow-2xl transition-all duration-300 shadow-xl group hover:scale-[1.01]"
          onClick={() => navigate('/mood')}
        >
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-wellness-lavender-dark group-hover:text-wellness-lavender">
              <div className="p-2 rounded-lg bg-wellness-lavender/20 group-hover:bg-wellness-lavender/30 transition-colors">
                <Heart className="h-5 w-5" />
              </div>
              Wellness Check-in
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center space-y-4">
              <p className="text-wellness-sage-dark/70 leading-relaxed">How's your energy today?</p>
              <div className="flex justify-center gap-2">
                {[1, 2, 3, 4, 5].map((rating) => (
                  <button
                    key={rating}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleWellnessRating(rating);
                    }}
                    className={`w-5 h-5 rounded-full transition-all hover:scale-110 ${
                      rating <= wellnessRating
                        ? "bg-wellness-lavender shadow-md"
                        : "bg-wellness-lavender/20 hover:bg-wellness-lavender/40"
                    }`}
                  />
                ))}
              </div>
              {wellnessRating > 0 && (
                <p className="text-sm text-wellness-lavender-dark font-medium">
                  {wellnessRating}/5 - {wellnessRating >= 4 ? "Feeling great! ✨" : wellnessRating >= 3 ? "Pretty good 👍" : "Take it easy today 💜"}
                </p>
              )}
            </div>
            
            <div className="space-y-3">
              <h4 className="font-medium text-wellness-sage-dark">Quick Reflection</h4>
              <Textarea
                placeholder="What's bringing you joy today? Any thoughts to capture..."
                value={wellnessReflection}
                onChange={(e) => {
                  e.stopPropagation();
                  setWellnessReflection(e.target.value);
                }}
                onClick={(e) => e.stopPropagation()}
                className="min-h-[100px] resize-none border-wellness-lavender/20 focus:border-wellness-lavender/50 transition-colors"
              />
              <Button 
                onClick={(e) => {
                  e.stopPropagation();
                  handleSaveReflection();
                }}
                className="w-full bg-wellness-sage hover:bg-wellness-sage-dark text-white shadow-md hover:shadow-lg transition-all"
              >
                <Save className="h-4 w-4 mr-2" />
                Save Reflection
              </Button>
            </div>

            <Button className="w-full bg-wellness-lavender hover:bg-wellness-lavender-dark text-white shadow-md hover:shadow-lg transition-all">
              <Heart className="h-4 w-4 mr-2" />
              Open Mood Journal
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Inspirational Quote */}
      <Card className="glass-morphism border-wellness-peach/20 text-center shadow-xl hover:shadow-2xl transition-all duration-300">
        <CardContent className="p-8 lg:p-12">
          <div className="flex items-center justify-center mb-4">
            <Sparkles className="h-6 w-6 text-wellness-peach animate-pulse" />
          </div>
          <blockquote className="text-xl lg:text-2xl font-medium text-wellness-sage-dark mb-6 leading-relaxed">
            "Peace comes from within. Do not seek it without."
          </blockquote>
          <cite className="text-wellness-sage-dark/70 text-lg">— Buddha</cite>
        </CardContent>
      </Card>

      {/* Create Task Dialog */}
      <CreateTaskDialog
        isOpen={showCreateTask}
        onClose={() => setShowCreateTask(false)}
        onTaskCreate={handleCreateTask}
      />
    </div>
  );
};

export default Index;
