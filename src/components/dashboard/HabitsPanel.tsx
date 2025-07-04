
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { X, Target } from "lucide-react";

interface Habit {
  id: string;
  name: string;
  completed: boolean;
}

interface HabitsPanelProps {
  habits: Habit[];
  onHabitToggle: (id: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

export const HabitsPanel = ({ habits, onHabitToggle, isOpen, onClose }: HabitsPanelProps) => {
  if (!isOpen) return null;

  const completedCount = habits.filter(h => h.completed).length;
  const progress = Math.round((completedCount / habits.length) * 100);

  return (
    <div className="absolute top-full left-0 right-0 z-50 mt-2">
      <Card className="glass-morphism border-wellness-sky/20 shadow-xl">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-sm font-medium text-wellness-sky-dark">
              <Target className="h-4 w-4" />
              Daily Habits ({progress}%)
            </CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="h-6 w-6 p-0 hover:bg-wellness-sky/20"
            >
              <X className="h-3 w-3" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="pt-0 space-y-3">
          {habits.map((habit) => (
            <div
              key={habit.id}
              className={`flex items-center gap-3 p-2 rounded-lg transition-all ${
                habit.completed 
                  ? "bg-wellness-sky/10 opacity-75" 
                  : "hover:bg-wellness-sky/10"
              }`}
            >
              <Checkbox
                checked={habit.completed}
                onCheckedChange={() => onHabitToggle(habit.id)}
              />
              <span
                className={`text-sm ${
                  habit.completed 
                    ? "line-through text-wellness-sky-dark/60" 
                    : "text-wellness-sky-dark"
                }`}
              >
                {habit.name}
              </span>
            </div>
          ))}
          <div className="w-full bg-wellness-sky/20 rounded-full h-2 mt-4">
            <div 
              className="bg-wellness-sky h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
