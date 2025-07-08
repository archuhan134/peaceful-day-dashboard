
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Sparkles } from "lucide-react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import AppHeader from "@/components/AppHeader";
import { CreateHabitDialog } from "@/components/habits/CreateHabitDialog";
import { HabitCard } from "@/components/habits/HabitCard";

interface Habit {
  id: string;
  name: string;
  frequency: string;
  color: string;
  completed: boolean[];
  streak: number;
}

const Habits = () => {
  const [habits, setHabits] = useLocalStorage<Habit[]>("habits", [
    { 
      id: "1", 
      name: "Morning Meditation", 
      frequency: "daily", 
      color: "sage", 
      completed: [true, true, false, true, false, false, false], 
      streak: 12
    },
    { 
      id: "2", 
      name: "Drink 8 Glasses of Water", 
      frequency: "daily", 
      color: "sky", 
      completed: [true, false, true, true, true, false, false], 
      streak: 4
    },
    { 
      id: "3", 
      name: "Evening Reading", 
      frequency: "5x", 
      color: "lavender", 
      completed: [false, true, true, false, true, false, false], 
      streak: 0
    },
    { 
      id: "4", 
      name: "Exercise", 
      frequency: "3x", 
      color: "peach", 
      completed: [true, false, false, true, false, true, false], 
      streak: 3
    }
  ]);
  
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingHabit, setEditingHabit] = useState<Habit | null>(null);

  const handleSaveHabit = (habitData: Omit<Habit, 'id' | 'completed' | 'streak'>) => {
    if (editingHabit) {
      // Edit existing habit
      setHabits(prev => prev.map(habit => 
        habit.id === editingHabit.id 
          ? { ...habit, ...habitData }
          : habit
      ));
      setEditingHabit(null);
    } else {
      // Create new habit
      const newHabit: Habit = {
        id: Date.now().toString(),
        ...habitData,
        completed: [false, false, false, false, false, false, false],
        streak: 0
      };
      setHabits(prev => [...prev, newHabit]);
    }
  };

  const handleToggleDay = (habitId: string, dayIndex: number) => {
    setHabits(prev => prev.map(habit => {
      if (habit.id === habitId) {
        const newCompleted = [...habit.completed];
        newCompleted[dayIndex] = !newCompleted[dayIndex];
        
        // Update streak based on completion
        let newStreak = habit.streak;
        if (newCompleted[dayIndex]) {
          newStreak += 1;
        } else {
          newStreak = Math.max(0, newStreak - 1);
        }
        
        return { ...habit, completed: newCompleted, streak: newStreak };
      }
      return habit;
    }));
  };

  const handleMarkToday = (habitId: string) => {
    const today = new Date().getDay();
    const mondayIndex = today === 0 ? 6 : today - 1; // Convert to Monday=0 format
    handleToggleDay(habitId, mondayIndex);
  };

  const handleEditHabit = (habit: Habit) => {
    setEditingHabit(habit);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setEditingHabit(null);
  };

  return (
    <div className="space-y-6 px-2 sm:px-0">
      <AppHeader />
      
      {/* Header Section */}
      <div className="text-center mb-6">
        <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-wellness-sage-dark via-wellness-sky-dark to-wellness-lavender-dark bg-clip-text text-transparent mb-3">
          Habit Tracking
        </h1>
        <p className="text-wellness-sage-dark/70 text-lg max-w-2xl mx-auto">
          Build lasting positive habits that nurture your well-being
        </p>
      </div>

      {/* Habits Grid */}
      <div className="grid gap-6 mb-8">
        {habits.map((habit) => (
          <HabitCard
            key={habit.id}
            habit={habit}
            onToggleDay={handleToggleDay}
            onMarkToday={handleMarkToday}
            onEdit={handleEditHabit}
          />
        ))}
      </div>

      {/* Create New Habit Section */}
      <Card className="glass-morphism border-wellness-sage/30 hover:shadow-xl transition-all duration-300">
        <CardContent className="p-8 text-center">
          <div className="space-y-6">
            <div className="mx-auto w-16 h-16 bg-gradient-to-br from-wellness-sage/20 to-wellness-sky/20 rounded-full flex items-center justify-center mb-4">
              <Sparkles className="h-8 w-8 text-wellness-sage-dark" />
            </div>
            
            <div>
              <h3 className="text-xl font-semibold text-wellness-sage-dark mb-2">
                Ready to Build a New Habit?
              </h3>
              <p className="text-wellness-sage-dark/70 max-w-md mx-auto leading-relaxed">
                Start small, be consistent, and watch as positive changes compound over time
              </p>
            </div>

            <Button 
              onClick={() => setIsDialogOpen(true)}
              className="bg-gradient-to-r from-wellness-sage to-wellness-sky hover:from-wellness-sage-dark hover:to-wellness-sky-dark text-white px-8 py-3 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Plus className="h-5 w-5 mr-2" />
              Create New Habit
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Create/Edit Habit Dialog */}
      <CreateHabitDialog
        isOpen={isDialogOpen}
        onClose={handleCloseDialog}
        onSave={handleSaveHabit}
        editingHabit={editingHabit}
      />
    </div>
  );
};

export default Habits;
