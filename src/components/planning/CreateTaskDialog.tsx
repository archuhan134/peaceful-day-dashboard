
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export interface Task {
  id: string;
  name: string;
  time: string;
  priority: "High" | "Medium" | "Low";
  category: "Work Projects" | "Health & Wellness" | "Personal Growth" | "Relationship";
  completed: boolean;
}

interface CreateTaskDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (task: Omit<Task, 'id' | 'completed'>) => void;
  editingTask?: Task | null;
}

const priorityOptions = [
  { value: "High", label: "High" },
  { value: "Medium", label: "Medium" },
  { value: "Low", label: "Low" }
];

const categoryOptions = [
  { value: "Work Projects", label: "Work Projects" },
  { value: "Health & Wellness", label: "Health & Wellness" },
  { value: "Personal Growth", label: "Personal Growth" },
  { value: "Relationship", label: "Relationship" }
];

export const CreateTaskDialog = ({ isOpen, onClose, onSave, editingTask }: CreateTaskDialogProps) => {
  const [taskName, setTaskName] = useState("");
  const [time, setTime] = useState("");
  const [priority, setPriority] = useState<"High" | "Medium" | "Low">("Medium");
  const [category, setCategory] = useState<"Work Projects" | "Health & Wellness" | "Personal Growth" | "Relationship">("Work Projects");

  useEffect(() => {
    if (editingTask) {
      setTaskName(editingTask.name);
      setTime(editingTask.time);
      setPriority(editingTask.priority);
      setCategory(editingTask.category);
    } else {
      setTaskName("");
      setTime("");
      setPriority("Medium");
      setCategory("Work Projects");
    }
  }, [editingTask, isOpen]);

  const handleSave = () => {
    if (taskName.trim()) {
      onSave({ 
        name: taskName.trim(), 
        time: time.trim(),
        priority,
        category
      });
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md glass-morphism border-wellness-sage/30 rounded-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-wellness-sage-dark text-center">
            {editingTask ? "Edit Task" : "Add New Task"}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          <div className="space-y-2">
            <Label htmlFor="task-name" className="text-sm font-medium text-wellness-sage-dark">
              Task Name
            </Label>
            <Input
              id="task-name"
              placeholder="Enter task name"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
              className="border-wellness-sage/30 focus:border-wellness-sage/50 rounded-xl"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="time" className="text-sm font-medium text-wellness-sage-dark">
              Time
            </Label>
            <Input
              id="time"
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="border-wellness-sage/30 focus:border-wellness-sage/50 rounded-xl"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium text-wellness-sage-dark">
              Priority
            </Label>
            <Select value={priority} onValueChange={(value: "High" | "Medium" | "Low") => setPriority(value)}>
              <SelectTrigger className="border-wellness-sage/30 focus:border-wellness-sage/50 rounded-xl">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="glass-morphism border-wellness-sage/30 rounded-xl">
                {priorityOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium text-wellness-sage-dark">
              Category
            </Label>
            <Select value={category} onValueChange={(value: "Work Projects" | "Health & Wellness" | "Personal Growth" | "Relationship") => setCategory(value)}>
              <SelectTrigger className="border-wellness-sage/30 focus:border-wellness-sage/50 rounded-xl">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="glass-morphism border-wellness-sage/30 rounded-xl">
                {categoryOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex flex-col gap-3 pt-4">
          <Button 
            onClick={handleSave}
            className="w-full bg-black hover:bg-gray-800 text-white rounded-xl py-3 font-medium"
            disabled={!taskName.trim()}
          >
            {editingTask ? "Edit Task" : "Add Task"}
          </Button>
          <Button 
            variant="ghost" 
            onClick={onClose}
            className="w-full text-wellness-sage-dark hover:bg-wellness-sage/10 rounded-xl py-3"
          >
            Cancel
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
