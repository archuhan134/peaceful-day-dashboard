
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Plus, Target, Trash2, Trophy, Flame, Star } from "lucide-react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import AppHeader from "@/components/AppHeader";

const Habits = () => {
  const [habits, setHabits] = useLocalStorage("habits", [
    { id: "1", name: "Morning meditation", completed: false, streak: 3 },
    { id: "2", name: "Drink 8 glasses of water", completed: false, streak: 7 },
    { id: "3", name: "Exercise for 30 minutes", completed: false, streak: 1 },
    { id: "4", name: "Read for 20 minutes", completed: false, streak: 5 },
    { id: "5", name: "Practice gratitude", completed: false, streak: 2 }
  ]);
  
  const [newHabit, setNewHabit] = useState("");

  const handleToggleHabit = (id: string) => {
    setHabits(prev => prev.map(habit => 
      habit.id === id 
        ? { 
            ...habit, 
            completed: !habit.completed,
            streak: !habit.completed ? habit.streak + 1 : Math.max(0, habit.streak - 1)
          } 
        : habit
    ));
  };

  const handleAddHabit = () => {
    if (newHabit.trim()) {
      const newId = Date.now().toString();
      setHabits(prev => [...prev, {
        id: newId,
        name: newHabit.trim(),
        completed: false,
        streak: 0
      }]);
      setNewHabit("");
    }
  };

  const handleDeleteHabit = (id: string) => {
    setHabits(prev => prev.filter(habit => habit.id !== id));
  };

  const completedCount = habits.filter(h => h.completed).length;
  const progress = habits.length > 0 ? Math.round((completedCount / habits.length) * 100) : 0;
  const longestStreak = Math.max(...habits.map(h => h.streak), 0);

  const getStreakIcon = (streak: number) => {
    if (streak >= 7) return <Trophy className="h-4 w-4 text-yellow-500" />;
    if (streak >= 3) return <Flame className="h-4 w-4 text-orange-500" />;
    return <Star className="h-4 w-4 text-wellness-sky" />;
  };

  const getMotivationalMessage = () => {
    if (progress === 100) return "Amazing! You're crushing it today! 🎉";
    if (progress >= 75) return "So close to perfection! Keep going! 💪";
    if (progress >= 50) return "You're doing great! Halfway there! ⭐";
    if (progress >= 25) return "Good start! Every step counts! 🌱";
    return "Let's make today count! You've got this! ✨";
  };

  return (
    <div className="space-y-6">
      <AppHeader />
      
      {/* Progress Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="glass-morphism border-wellness-sky/30 hover:shadow-xl transition-all duration-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-wellness-sky-dark">
              <div className="p-2 rounded-lg bg-wellness-sky/20">
                <Target className="h-5 w-5" />
              </div>
              Today's Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center space-y-4">
              <div className="text-4xl font-bold text-wellness-sky-dark">
                {completedCount}/{habits.length}
              </div>
              <div className="space-y-2">
                <div className="w-full bg-wellness-sky/20 rounded-full h-4">
                  <div 
                    className="bg-gradient-to-r from-wellness-sky to-wellness-sky-dark h-4 rounded-full transition-all duration-700 shadow-sm"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <p className="text-sm font-medium text-wellness-sky-dark">{progress}% Complete</p>
              </div>
              <p className="text-sm text-wellness-sage-dark/70 leading-relaxed">
                {getMotivationalMessage()}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-morphism border-wellness-peach/30 hover:shadow-xl transition-all duration-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-wellness-peach-dark">
              <div className="p-2 rounded-lg bg-wellness-peach/20">
                <Flame className="h-5 w-5" />
              </div>
              Streak Stats
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center space-y-4">
              <div className="text-4xl font-bold text-wellness-peach-dark">
                {longestStreak}
              </div>
              <p className="text-sm font-medium text-wellness-peach-dark">Best Streak</p>
              <p className="text-sm text-wellness-sage-dark/70 leading-relaxed">
                {longestStreak >= 7 ? "You're on fire! 🔥" : 
                 longestStreak >= 3 ? "Building momentum! 💪" : 
                 "Every day is a new beginning! 🌟"}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Add New Habit */}
      <Card className="glass-morphism border-wellness-sage/30 hover:shadow-xl transition-all duration-300">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-wellness-sage-dark">
            <div className="p-2 rounded-lg bg-wellness-sage/20">
              <Plus className="h-5 w-5" />
            </div>
            Create New Habit
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-3">
            <Input
              placeholder="What healthy habit would you like to build?"
              value={newHabit}
              onChange={(e) => setNewHabit(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAddHabit()}
              className="border-wellness-sage/30 focus:border-wellness-sage/50 transition-colors"
            />
            <Button 
              onClick={handleAddHabit}
              className="bg-wellness-sage hover:bg-wellness-sage-dark text-white shadow-md hover:shadow-lg transition-all px-6"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Habits List */}
      <div className="grid gap-4">
        {habits.map((habit) => (
          <Card 
            key={habit.id} 
            className={`glass-morphism transition-all duration-300 hover:scale-[1.01] ${
              habit.completed 
                ? "border-wellness-sky/40 bg-wellness-sky/5 shadow-lg" 
                : "border-wellness-sage/30 hover:border-wellness-sage/50 hover:shadow-lg"
            }`}
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 flex-1">
                  <Checkbox
                    checked={habit.completed}
                    onCheckedChange={() => handleToggleHabit(habit.id)}
                    className="data-[state=checked]:bg-wellness-sky data-[state=checked]:border-wellness-sky scale-110"
                  />
                  <div className="flex-1">
                    <span 
                      className={`font-medium text-lg ${
                        habit.completed 
                          ? "line-through text-wellness-sage-dark/60" 
                          : "text-wellness-sage-dark"
                      }`}
                    >
                      {habit.name}
                    </span>
                    {habit.completed && (
                      <p className="text-sm text-wellness-sky-dark mt-1">
                        Great job! ✨ Keep it up tomorrow!
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge 
                    variant="outline" 
                    className={`border-wellness-peach text-wellness-peach-dark bg-wellness-peach/10 px-3 py-1 ${
                      habit.streak >= 7 ? 'border-yellow-400 text-yellow-600 bg-yellow-50' :
                      habit.streak >= 3 ? 'border-orange-400 text-orange-600 bg-orange-50' : ''
                    }`}
                  >
                    <div className="flex items-center gap-1">
                      {getStreakIcon(habit.streak)}
                      {habit.streak} day{habit.streak !== 1 ? 's' : ''}
                    </div>
                  </Badge>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDeleteHabit(habit.id)}
                    className="text-red-500 hover:text-red-700 hover:bg-red-50 transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {habits.length === 0 && (
        <Card className="glass-morphism border-wellness-sage/20 text-center">
          <CardContent className="p-12">
            <div className="space-y-4">
              <Target className="h-16 w-16 text-wellness-sage/50 mx-auto" />
              <h3 className="text-xl font-medium text-wellness-sage-dark">
                Ready to build amazing habits?
              </h3>
              <p className="text-wellness-sage-dark/70 max-w-md mx-auto leading-relaxed">
                Start small, stay consistent, and watch yourself grow. Every expert was once a beginner! ✨
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Habits;
