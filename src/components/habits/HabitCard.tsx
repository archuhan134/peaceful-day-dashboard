
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Pencil, Heart } from "lucide-react";

interface Habit {
  id: string;
  name: string;
  frequency: string;
  color: string;
  completed: boolean[];
  streak: number;
}

interface HabitCardProps {
  habit: Habit;
  onToggleDay: (habitId: string, dayIndex: number) => void;
  onMarkToday: (habitId: string) => void;
  onEdit: (habit: Habit) => void;
}

const colorMap = {
  sage: {
    bg: "bg-wellness-sage/10",
    border: "border-wellness-sage/30",
    text: "text-wellness-sage-dark",
    button: "bg-wellness-sage hover:bg-wellness-sage-dark",
    progress: "stroke-wellness-sage",
    badge: "bg-wellness-sage/20 text-wellness-sage-dark border-wellness-sage/30"
  },
  sky: {
    bg: "bg-wellness-sky/10", 
    border: "border-wellness-sky/30",
    text: "text-wellness-sky-dark",
    button: "bg-wellness-sky hover:bg-wellness-sky-dark",
    progress: "stroke-wellness-sky",
    badge: "bg-wellness-sky/20 text-wellness-sky-dark border-wellness-sky/30"
  },
  lavender: {
    bg: "bg-wellness-lavender/10",
    border: "border-wellness-lavender/30", 
    text: "text-wellness-lavender-dark",
    button: "bg-wellness-lavender hover:bg-wellness-lavender-dark",
    progress: "stroke-wellness-lavender",
    badge: "bg-wellness-lavender/20 text-wellness-lavender-dark border-wellness-lavender/30"
  },
  peach: {
    bg: "bg-wellness-peach/10",
    border: "border-wellness-peach/30",
    text: "text-wellness-peach-dark", 
    button: "bg-wellness-peach hover:bg-wellness-peach-dark",
    progress: "stroke-wellness-peach",
    badge: "bg-wellness-peach/20 text-wellness-peach-dark border-wellness-peach/30"
  }
};

const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export const HabitCard = ({ habit, onToggleDay, onMarkToday, onEdit }: HabitCardProps) => {
  const colors = colorMap[habit.color as keyof typeof colorMap] || colorMap.sage;
  const completedCount = habit.completed.filter(Boolean).length;
  const targetDays = habit.frequency === 'daily' ? 7 : habit.frequency === '5x' ? 5 : 3;
  const progress = Math.round((completedCount / targetDays) * 100);
  const today = new Date().getDay();
  const mondayIndex = today === 0 ? 6 : today - 1; // Convert Sunday=0 to Monday=0 format

  const CircularProgress = ({ percentage }: { percentage: number }) => {
    const radius = 35;
    const circumference = 2 * Math.PI * radius;
    const strokeDasharray = circumference;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    return (
      <div className="relative w-20 h-20">
        <svg className="w-20 h-20 transform -rotate-90" viewBox="0 0 80 80">
          <circle
            cx="40"
            cy="40"
            r={radius}
            stroke="currentColor"
            strokeWidth="6"
            fill="transparent"
            className="text-gray-200"
          />
          <circle
            cx="40"
            cy="40"
            r={radius}
            stroke="currentColor"
            strokeWidth="6"
            fill="transparent"
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            className={`${colors.progress} transition-all duration-500`}
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className={`text-lg font-bold ${colors.text}`}>
            {progress}%
          </span>
        </div>
      </div>
    );
  };

  return (
    <Card className={`glass-morphism ${colors.border} ${colors.bg} hover:shadow-xl transition-all duration-300 overflow-hidden`}>
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className={`text-lg font-semibold ${colors.text} mb-1`}>
              {habit.name}
            </h3>
            <p className="text-sm text-gray-600">
              Target{' '}
              {habit.frequency === 'daily' ? 'Daily' : 
               habit.frequency === '5x' ? '5x per week' : 
               '3x per week'}
            </p>
          </div>
          <div className="flex items-center gap-2">
            {habit.streak > 0 && (
              <Badge className={`${colors.badge} border px-2 py-1 text-xs font-medium`}>
                <Heart className="w-3 h-3 mr-1" />
                {habit.streak} day streak
              </Badge>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onEdit(habit)}
              className={`h-8 w-8 p-0 hover:${colors.bg} ${colors.text}`}
            >
              <Pencil className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="flex items-center justify-between mb-6">
          <CircularProgress percentage={progress} />
          <div className="text-right">
            <div className={`text-2xl font-bold ${colors.text}`}>
              {completedCount}/{targetDays}
            </div>
            <div className="text-sm text-gray-600">This Week</div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-7 gap-2">
            {weekDays.map((day, index) => (
              <div key={day} className="text-center">
                <div className="text-xs text-gray-500 mb-1">{day}</div>
                <button
                  onClick={() => onToggleDay(habit.id, index)}
                  className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all ${
                    habit.completed[index]
                      ? `${colors.button.split(' ')[0]} border-transparent text-white`
                      : `border-gray-200 hover:border-gray-300 ${index === mondayIndex ? 'ring-2 ring-blue-200' : ''}`
                  }`}
                >
                  {habit.completed[index] && <Check className="w-4 h-4" />}
                </button>
              </div>
            ))}
          </div>

          <Button
            onClick={() => onMarkToday(habit.id)}
            className={`w-full ${colors.button} text-white rounded-xl py-3 font-medium hover:shadow-lg transition-all`}
          >
            <Heart className="w-4 h-4 mr-2" />
            Mark Complete Today
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
