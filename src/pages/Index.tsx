
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Heart, Calendar, Clock, List, Smile, Target, CheckCircle, Repeat } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { MoodSelector } from "@/components/dashboard/MoodSelector";
import { HabitsPanel } from "@/components/dashboard/HabitsPanel";
import { TasksPanel } from "@/components/dashboard/TasksPanel";
import { RoutinesPanel } from "@/components/dashboard/RoutinesPanel";

const Index = () => {
  const navigate = useNavigate();
  
  // State for panel visibility
  const [showMoodSelector, setShowMoodSelector] = useState(false);
  const [showHabitsPanel, setShowHabitsPanel] = useState(false);
  const [showTasksPanel, setShowTasksPanel] = useState(false);
  const [showRoutinesPanel, setShowRoutinesPanel] = useState(false);

  // LocalStorage states
  const [todayMood, setTodayMood] = useLocalStorage("todayMood", "😊");
  const [wellnessRating, setWellnessRating] = useLocalStorage("wellnessRating", 0);
  const [wellnessReflection, setWellnessReflection] = useLocalStorage("wellnessReflection", "");
  
  const [habits, setHabits] = useLocalStorage("habits", [
    { id: "1", name: "Morning meditation", completed: false },
    { id: "2", name: "Drink 8 glasses of water", completed: false },
    { id: "3", name: "Exercise for 30 minutes", completed: false },
    { id: "4", name: "Read for 20 minutes", completed: false },
    { id: "5", name: "Practice gratitude", completed: false }
  ]);

  const [tasks, setTasks] = useLocalStorage("tasks", [
    { id: "1", name: "Review weekly goals", completed: false },
    { id: "2", name: "Team meeting prep", completed: false },
    { id: "3", name: "Grocery shopping", completed: false },
    { id: "4", name: "Call family", completed: false }
  ]);

  const [routines, setRoutines] = useLocalStorage("routines", [
    { id: "1", name: "Morning skincare", completed: false },
    { id: "2", name: "Evening wind-down", completed: false }
  ]);

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

  // Event handlers
  const handleMoodSelect = (mood: string) => {
    setTodayMood(mood);
  };

  const handleHabitToggle = (id: string) => {
    setHabits(prev => prev.map(habit => 
      habit.id === id ? { ...habit, completed: !habit.completed } : habit
    ));
  };

  const handleTaskToggle = (id: string) => {
    setTasks(prev => prev.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const handleRoutineToggle = (id: string) => {
    setRoutines(prev => prev.map(routine => 
      routine.id === id ? { ...routine, completed: !routine.completed } : routine
    ));
  };

  const handleUpcomingTaskToggle = (id: number) => {
    setUpcomingTasks(prev => prev.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const handleWellnessRating = (rating: number) => {
    setWellnessRating(rating);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 sm:space-y-8 animate-fade-in p-4">
      {/* Welcome Header */}
      <div className="text-center space-y-4 px-4 sm:px-0">
        <h1 className="text-2xl sm:text-4xl font-poppins font-bold text-wellness-sage-dark">
          Welcome to Your Peaceful Day
        </h1>
        <p className="text-base sm:text-lg text-wellness-sage-dark/70 max-w-2xl mx-auto">
          Take a moment to breathe, center yourself, and see how your day is flowing
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
        <div className="relative">
          <Card 
            className="glass-morphism border-wellness-sage/20 hover:shadow-lg transition-all duration-300 cursor-pointer transform hover:scale-105"
            onClick={() => setShowMoodSelector(!showMoodSelector)}
          >
            <CardContent className="p-4 sm:p-6 text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Smile className="h-4 w-4 text-wellness-sage" />
                <div className="text-2xl sm:text-3xl">{todayMood}</div>
              </div>
              <p className="text-xs sm:text-sm text-wellness-sage-dark/70">Today's Mood</p>
            </CardContent>
          </Card>
          <MoodSelector
            currentMood={todayMood}
            onMoodSelect={handleMoodSelect}
            isOpen={showMoodSelector}
            onClose={() => setShowMoodSelector(false)}
          />
        </div>

        <div className="relative">
          <Card 
            className="glass-morphism border-wellness-sky/20 hover:shadow-lg transition-all duration-300 cursor-pointer transform hover:scale-105"
            onClick={() => setShowHabitsPanel(!showHabitsPanel)}
          >
            <CardContent className="p-4 sm:p-6 text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Target className="h-4 w-4 text-wellness-sky-dark" />
                <div className="text-xl sm:text-2xl font-bold text-wellness-sky-dark">
                  {completedHabits}/{totalHabits}
                </div>
              </div>
              <p className="text-xs sm:text-sm text-wellness-sage-dark/70">Habits Complete</p>
            </CardContent>
          </Card>
          <HabitsPanel
            habits={habits}
            onHabitToggle={handleHabitToggle}
            isOpen={showHabitsPanel}
            onClose={() => setShowHabitsPanel(false)}
          />
        </div>

        <div className="relative">
          <Card 
            className="glass-morphism border-wellness-lavender/20 hover:shadow-lg transition-all duration-300 cursor-pointer transform hover:scale-105"
            onClick={() => setShowTasksPanel(!showTasksPanel)}
          >
            <CardContent className="p-4 sm:p-6 text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <CheckCircle className="h-4 w-4 text-wellness-lavender-dark" />
                <div className="text-xl sm:text-2xl font-bold text-wellness-lavender-dark">
                  {totalTasks - completedTasks}
                </div>
              </div>
              <p className="text-xs sm:text-sm text-wellness-sage-dark/70">Tasks Today</p>
            </CardContent>
          </Card>
          <TasksPanel
            tasks={tasks}
            onTaskToggle={handleTaskToggle}
            isOpen={showTasksPanel}
            onClose={() => setShowTasksPanel(false)}
          />
        </div>

        <div className="relative">
          <Card 
            className="glass-morphism border-wellness-peach/20 hover:shadow-lg transition-all duration-300 cursor-pointer transform hover:scale-105"
            onClick={() => setShowRoutinesPanel(!showRoutinesPanel)}
          >
            <CardContent className="p-4 sm:p-6 text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Repeat className="h-4 w-4 text-wellness-peach-dark" />
                <div className="text-xl sm:text-2xl font-bold text-wellness-peach-dark">
                  {completedRoutines}
                </div>
              </div>
              <p className="text-xs sm:text-sm text-wellness-sage-dark/70">Routines Done</p>
            </CardContent>
          </Card>
          <RoutinesPanel
            routines={routines}
            onRoutineToggle={handleRoutineToggle}
            isOpen={showRoutinesPanel}
            onClose={() => setShowRoutinesPanel(false)}
          />
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
        {/* Today's Schedule */}
        <Card className="glass-morphism border-wellness-sage/20 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-wellness-sage-dark">
              <Calendar className="h-5 w-5" />
              Today's Flow
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {upcomingTasks.map((task) => (
              <div
                key={task.id}
                className={`flex items-center justify-between p-3 rounded-lg transition-all ${
                  task.completed
                    ? "bg-wellness-sage/10 opacity-75"
                    : "bg-wellness-sky/10 hover:bg-wellness-sky/20"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Checkbox
                    checked={task.completed}
                    onCheckedChange={() => handleUpcomingTaskToggle(task.id)}
                  />
                  <span
                    className={task.completed ? "line-through text-wellness-sage-dark/60" : "text-wellness-sage-dark"}
                  >
                    {task.task}
                  </span>
                </div>
                <Badge
                  variant="outline"
                  className={
                    task.completed
                      ? "border-wellness-sage text-wellness-sage"
                      : "border-wellness-sky text-wellness-sky-dark"
                  }
                >
                  {task.time}
                </Badge>
              </div>
            ))}
            <Button 
              className="w-full mt-4 bg-wellness-sage hover:bg-wellness-sage-dark text-white shadow-sm"
              onClick={() => navigate('/planning')}
            >
              <List className="h-4 w-4 mr-2" />
              View All Tasks
            </Button>
          </CardContent>
        </Card>

        {/* Wellness Check-in */}
        <Card 
          className="glass-morphism border-wellness-lavender/20 cursor-pointer hover:shadow-lg transition-all duration-300 shadow-lg"
          onClick={() => navigate('/mood')}
        >
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-wellness-lavender-dark">
              <Heart className="h-5 w-5" />
              Wellness Check-in
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center space-y-4">
              <p className="text-wellness-sage-dark/70">How are you feeling right now?</p>
              <div className="flex justify-center gap-2">
                {[1, 2, 3, 4, 5].map((rating) => (
                  <button
                    key={rating}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleWellnessRating(rating);
                    }}
                    className={`w-4 h-4 rounded-full transition-colors ${
                      rating <= wellnessRating
                        ? "bg-wellness-lavender"
                        : "bg-wellness-lavender/20"
                    }`}
                  />
                ))}
              </div>
              <p className="text-sm text-wellness-sage-dark/50">
                {wellnessRating > 0 && `${wellnessRating}/5`}
              </p>
            </div>
            
            <div className="space-y-3">
              <h4 className="font-medium text-wellness-sage-dark">Quick Reflection</h4>
              <Textarea
                placeholder="How are you feeling today? What's on your mind?"
                value={wellnessReflection}
                onChange={(e) => {
                  e.stopPropagation();
                  setWellnessReflection(e.target.value);
                }}
                onClick={(e) => e.stopPropagation()}
                className="min-h-[80px] resize-none border-wellness-lavender/20"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Button 
                variant="outline" 
                className="border-wellness-peach text-wellness-peach-dark hover:bg-wellness-peach/10"
                onClick={(e) => e.stopPropagation()}
              >
                Grateful
              </Button>
              <Button 
                variant="outline" 
                className="border-wellness-sky text-wellness-sky-dark hover:bg-wellness-sky/10"
                onClick={(e) => e.stopPropagation()}
              >
                Peaceful
              </Button>
              <Button 
                variant="outline" 
                className="border-wellness-sage text-wellness-sage-dark hover:bg-wellness-sage/10"
                onClick={(e) => e.stopPropagation()}
              >
                Energized
              </Button>
              <Button 
                variant="outline" 
                className="border-wellness-lavender text-wellness-lavender-dark hover:bg-wellness-lavender/10"
                onClick={(e) => e.stopPropagation()}
              >
                Focused
              </Button>
            </div>

            <Button className="w-full bg-wellness-lavender hover:bg-wellness-lavender-dark text-white shadow-sm">
              <Heart className="h-4 w-4 mr-2" />
              Open Mood Journal
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Inspirational Quote */}
      <Card className="glass-morphism border-wellness-peach/20 text-center shadow-lg">
        <CardContent className="p-6 sm:p-8">
          <blockquote className="text-lg sm:text-xl font-medium text-wellness-sage-dark mb-4">
            "Peace comes from within. Do not seek it without."
          </blockquote>
          <cite className="text-wellness-sage-dark/70">— Buddha</cite>
        </CardContent>
      </Card>
    </div>
  );
};

export default Index;
