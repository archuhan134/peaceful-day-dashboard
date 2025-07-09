
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Calendar, Repeat, Clock, Bell, Tag } from "lucide-react";
import { toast } from "sonner";

interface CreateTaskDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onTaskCreate: (task: any) => void;
}

const CreateTaskDialog = ({ isOpen, onClose, onTaskCreate }: CreateTaskDialogProps) => {
  const [taskName, setTaskName] = useState("");
  const [selectedColor, setSelectedColor] = useState("#000000");
  const [date, setDate] = useState("Today");
  const [repeat, setRepeat] = useState("Off");
  const [time, setTime] = useState("Anytime");
  const [reminder, setReminder] = useState("No Reminder");
  const [tag, setTag] = useState("No tag");
  const [subtasks, setSubtasks] = useState<string[]>([]);

  const colors = [
    "#FF69B4", "#FFB347", "#FFFF00", "#90EE90", 
    "#000000", "#87CEEB", "#DDA0DD"
  ];

  const handleCreateTask = () => {
    if (!taskName.trim()) {
      toast.error("Please enter a task name");
      return;
    }

    const newTask = {
      id: Date.now().toString(),
      name: taskName,
      color: selectedColor,
      date,
      repeat,
      time,
      reminder,
      tag,
      subtasks,
      completed: false,
      createdAt: new Date().toISOString()
    };

    onTaskCreate(newTask);
    toast.success("Task created successfully!");
    
    // Reset form
    setTaskName("");
    setSelectedColor("#000000");
    setDate("Today");
    setRepeat("Off");
    setTime("Anytime");
    setReminder("No Reminder");
    setTag("No tag");
    setSubtasks([]);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-gradient-to-br from-wellness-sky/10 to-wellness-lavender/10">
        <DialogHeader className="text-center">
          <div className="mx-auto w-16 h-16 bg-gradient-to-br from-orange-400 to-orange-500 rounded-full flex items-center justify-center mb-4">
            <span className="text-2xl">😊</span>
          </div>
          <DialogTitle className="text-xl text-wellness-sage-dark">New Task</DialogTitle>
          <p className="text-sm text-wellness-sage-dark/70">0/50</p>
        </DialogHeader>

        <div className="space-y-6">
          {/* Task Name Input */}
          <Input
            placeholder="Enter task name..."
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            className="text-center border-wellness-sage/30 focus:border-wellness-sage"
          />

          {/* Color Selector */}
          <div className="flex justify-center gap-2">
            {colors.map((color) => (
              <button
                key={color}
                onClick={() => setSelectedColor(color)}
                className={`w-8 h-8 rounded-full border-2 transition-all ${
                  selectedColor === color 
                    ? "border-wellness-sage scale-110" 
                    : "border-gray-300"
                }`}
                style={{ backgroundColor: color }}
              >
                {selectedColor === color && color === "#000000" && (
                  <span className="text-white text-xs">✓</span>
                )}
                {selectedColor === color && color !== "#000000" && (
                  <span className="text-white text-xs">✓</span>
                )}
              </button>
            ))}
          </div>

          {/* Options */}
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-wellness-sage/20">
              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-wellness-sage-dark" />
                <span className="font-medium text-wellness-sage-dark">Date</span>
              </div>
              <Badge variant="outline" className="text-wellness-sage-dark">
                {date} &gt;
              </Badge>
            </div>

            <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-wellness-sage/20">
              <div className="flex items-center gap-3">
                <Repeat className="h-5 w-5 text-wellness-sage-dark" />
                <span className="font-medium text-wellness-sage-dark">Repeat</span>
              </div>
              <Badge variant="outline" className="text-wellness-sage-dark">
                {repeat} &gt;
              </Badge>
            </div>

            <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-wellness-sage/20">
              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-wellness-sage-dark" />
                <span className="font-medium text-wellness-sage-dark">Time</span>
              </div>
              <Badge variant="outline" className="text-wellness-sage-dark">
                {time} &gt;
              </Badge>
            </div>

            <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-wellness-sage/20">
              <div className="flex items-center gap-3">
                <Bell className="h-5 w-5 text-wellness-sage-dark" />
                <span className="font-medium text-wellness-sage-dark">Reminder</span>
              </div>
              <Badge variant="outline" className="text-wellness-sage-dark">
                {reminder} &gt;
              </Badge>
            </div>

            <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-wellness-sage/20">
              <div className="flex items-center gap-3">
                <Tag className="h-5 w-5 text-wellness-sage-dark" />
                <span className="font-medium text-wellness-sage-dark">Tag</span>
              </div>
              <Badge variant="outline" className="text-wellness-sage-dark">
                {tag} &gt;
              </Badge>
            </div>
          </div>

          {/* Subtasks */}
          <div className="p-4 bg-white rounded-lg border border-wellness-sage/20">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">+</span>
              <span className="font-medium text-wellness-sage-dark">Subtasks</span>
            </div>
            <p className="text-sm text-wellness-sage-dark/70 text-center">
              Subtasks can be set as your daily routine or checklist
            </p>
          </div>

          {/* Create Button */}
          <Button
            onClick={handleCreateTask}
            className="w-full bg-wellness-sage hover:bg-wellness-sage-dark text-white"
          >
            Create Task
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateTaskDialog;
