
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { X, CheckCircle } from "lucide-react";

interface Task {
  id: string;
  name: string;
  completed: boolean;
}

interface TasksPanelProps {
  tasks: Task[];
  onTaskToggle: (id: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

export const TasksPanel = ({ tasks, onTaskToggle, isOpen, onClose }: TasksPanelProps) => {
  if (!isOpen) return null;

  const pendingTasks = tasks.filter(t => !t.completed);
  const completedTasks = tasks.filter(t => t.completed);

  return (
    <div className="absolute top-full left-0 right-0 z-50 mt-2">
      <Card className="glass-morphism border-wellness-lavender/20 shadow-xl">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-sm font-medium text-wellness-lavender-dark">
              <CheckCircle className="h-4 w-4" />
              Today's Tasks
            </CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="h-6 w-6 p-0 hover:bg-wellness-lavender/20"
            >
              <X className="h-3 w-3" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="pt-0 space-y-3 max-h-80 overflow-y-auto">
          {pendingTasks.length > 0 && (
            <div>
              <h4 className="text-xs font-medium text-wellness-lavender-dark/70 mb-2">Pending</h4>
              {pendingTasks.map((task) => (
                <div
                  key={task.id}
                  className="flex items-center gap-3 p-2 rounded-lg hover:bg-wellness-lavender/10 transition-all"
                >
                  <Checkbox
                    checked={task.completed}
                    onCheckedChange={() => onTaskToggle(task.id)}
                  />
                  <span className="text-sm text-wellness-lavender-dark">
                    {task.name}
                  </span>
                </div>
              ))}
            </div>
          )}
          
          {completedTasks.length > 0 && (
            <div>
              <h4 className="text-xs font-medium text-wellness-lavender-dark/70 mb-2">Completed</h4>
              {completedTasks.map((task) => (
                <div
                  key={task.id}
                  className="flex items-center gap-3 p-2 rounded-lg bg-wellness-lavender/10 opacity-75"
                >
                  <Checkbox
                    checked={task.completed}
                    onCheckedChange={() => onTaskToggle(task.id)}
                  />
                  <span className="text-sm line-through text-wellness-lavender-dark/60">
                    {task.name}
                  </span>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
