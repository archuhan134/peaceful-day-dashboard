
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Plus, Target, Trash2 } from "lucide-react";
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

  return (
    <div className="space-y-6">
      <AppHeader />
      
      {/* Progress Overview */}
      <Card className="glass-morphism border-wellness-sky/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-wellness-sky-dark">
            <Target className="h-5 w-5" />
            Today's Progress
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-4">
            <span className="text-2xl font-bold text-wellness-sky-dark">
              {completedCount}/{habits.length}
            </span>
            <Badge variant="outline" className="border-wellness-sky text-wellness-sky-dark">
              {progress}% Complete
            </Badge>
          </div>
          <div className="w-full bg-wellness-sky/20 rounded-full h-3">
            <div 
              className="bg-wellness-sky h-3 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </CardContent>
      </Card>

      {/* Add New Habit */}
      <Card className="glass-morphism border-wellness-sage/20">
        <CardContent className="pt-6">
          <div className="flex gap-2">
            <Input
              placeholder="Add a new healthy habit..."
              value={newHabit}
              onChange={(e) => setNewHabit(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAddHabit()}
              className="border-wellness-sage/20"
            />
            <Button 
              onClick={handleAddHabit}
              className="bg-wellness-sage hover:bg-wellness-sage-dark text-white"
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
            className={`glass-morphism transition-all duration-200 ${
              habit.completed 
                ? "border-wellness-sky/40 bg-wellness-sky/5" 
                : "border-wellness-sage/20 hover:border-wellness-sage/40"
            }`}
          >
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 flex-1">
                  <Checkbox
                    checked={habit.completed}
                    onCheckedChange={() => handleToggleHabit(habit.id)}
                  />
                  <span 
                    className={`font-medium ${
                      habit.completed 
                        ? "line-through text-wellness-sage-dark/60" 
                        : "text-wellness-sage-dark"
                    }`}
                  >
                    {habit.name}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge 
                    variant="outline" 
                    className="border-wellness-peach text-wellness-peach-dark"
                  >
                    {habit.streak} day streak
                  </Badge>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDeleteHabit(habit.id)}
                    className="text-red-500 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Habits;
