
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { X, Plus } from "lucide-react";

export interface Routine {
  id: string;
  name: string;
  timeBlock: string;
  tasks: string[];
}

interface CreateRoutineDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (routine: Omit<Routine, 'id'>) => void;
  editingRoutine?: Routine | null;
}

const defaultTimeBlocks = ["Morning", "Afternoon", "Night"];

export const CreateRoutineDialog = ({ isOpen, onClose, onSave, editingRoutine }: CreateRoutineDialogProps) => {
  const [routineName, setRoutineName] = useState("");
  const [timeBlock, setTimeBlock] = useState("Morning");
  const [tasks, setTasks] = useState<string[]>([""]);

  useEffect(() => {
    if (editingRoutine) {
      setRoutineName(editingRoutine.name);
      setTimeBlock(editingRoutine.timeBlock);
      setTasks(editingRoutine.tasks.length > 0 ? editingRoutine.tasks : [""]);
    } else {
      setRoutineName("");
      setTimeBlock("Morning");
      setTasks([""]);
    }
  }, [editingRoutine, isOpen]);

  const handleSave = () => {
    if (routineName.trim()) {
      const finalTasks = tasks.filter(task => task.trim() !== "");
      
      onSave({ 
        name: routineName.trim(), 
        timeBlock: timeBlock,
        tasks: finalTasks
      });
      onClose();
    }
  };

  const addTask = () => {
    setTasks([...tasks, ""]);
  };

  const updateTask = (index: number, value: string) => {
    const newTasks = [...tasks];
    newTasks[index] = value;
    setTasks(newTasks);
  };

  const removeTask = (index: number) => {
    if (tasks.length > 1) {
      setTasks(tasks.filter((_, i) => i !== index));
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md glass-morphism border-wellness-lavender/30 rounded-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="relative">
          <DialogTitle className="text-xl font-semibold text-wellness-lavender-dark text-center">
            {editingRoutine ? "Edit Routine" : "Create New Routine"}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          <div className="space-y-2">
            <Label htmlFor="routine-name" className="text-sm font-medium text-wellness-lavender-dark">
              Routine Name
            </Label>
            <Input
              id="routine-name"
              placeholder="e.g., Morning Routine"
              value={routineName}
              onChange={(e) => setRoutineName(e.target.value)}
              className="border-wellness-lavender/30 focus:border-wellness-lavender/50 rounded-xl"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium text-wellness-lavender-dark">
              Time Block
            </Label>
            <Select value={timeBlock} onValueChange={setTimeBlock}>
              <SelectTrigger className="border-wellness-lavender/30 focus:border-wellness-lavender/50 rounded-xl">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="glass-morphism border-wellness-lavender/30 rounded-xl">
                {defaultTimeBlocks.map((block) => (
                  <SelectItem key={block} value={block}>
                    {block}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium text-wellness-lavender-dark">
              Tasks/Habits
            </Label>
            <div className="space-y-2">
              {tasks.map((task, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    placeholder={`Task ${index + 1}`}
                    value={task}
                    onChange={(e) => updateTask(index, e.target.value)}
                    className="border-wellness-lavender/30 focus:border-wellness-lavender/50 rounded-xl flex-1"
                  />
                  {tasks.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeTask(index)}
                      className="text-red-500 hover:text-red-700 hover:bg-red-50"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addTask}
                className="w-full border-wellness-lavender/30 text-wellness-lavender-dark hover:bg-wellness-lavender/10 rounded-xl"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Task
              </Button>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 pt-4">
          <Button 
            onClick={handleSave}
            className="w-full bg-wellness-lavender hover:bg-wellness-lavender-dark text-white rounded-xl py-3 font-medium"
            disabled={!routineName.trim()}
          >
            {editingRoutine ? "Update Routine" : "Create Routine"}
          </Button>
          <Button 
            variant="ghost" 
            onClick={onClose}
            className="w-full text-wellness-lavender-dark hover:bg-wellness-lavender/10 rounded-xl py-3"
          >
            Cancel
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
