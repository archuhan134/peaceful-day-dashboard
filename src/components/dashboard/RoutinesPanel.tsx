
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { X, Repeat } from "lucide-react";

interface Routine {
  id: string;
  name: string;
  completed: boolean;
}

interface RoutinesPanelProps {
  routines: Routine[];
  onRoutineToggle: (id: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

export const RoutinesPanel = ({ routines, onRoutineToggle, isOpen, onClose }: RoutinesPanelProps) => {
  if (!isOpen) return null;

  const completedCount = routines.filter(r => r.completed).length;

  return (
    <div className="absolute top-full left-0 right-0 z-50 mt-2">
      <Card className="glass-morphism border-wellness-peach/20 shadow-xl">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-sm font-medium text-wellness-peach-dark">
              <Repeat className="h-4 w-4" />
              Daily Routines ({completedCount}/{routines.length})
            </CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="h-6 w-6 p-0 hover:bg-wellness-peach/20"
            >
              <X className="h-3 w-3" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="pt-0 space-y-3">
          {routines.map((routine) => (
            <div
              key={routine.id}
              className={`flex items-center gap-3 p-2 rounded-lg transition-all ${
                routine.completed 
                  ? "bg-wellness-peach/10 opacity-75" 
                  : "hover:bg-wellness-peach/10"
              }`}
            >
              <Checkbox
                checked={routine.completed}
                onCheckedChange={() => onRoutineToggle(routine.id)}
              />
              <span
                className={`text-sm ${
                  routine.completed 
                    ? "line-through text-wellness-peach-dark/60" 
                    : "text-wellness-peach-dark"
                }`}
              >
                {routine.name}
              </span>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};
