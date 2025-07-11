
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Calendar, Repeat, Clock, Bell, ArrowLeft, Check } from "lucide-react";
import { toast } from "sonner";

interface CreateTaskDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onTaskCreate: (task: any) => void;
}

const CreateTaskDialog = ({ isOpen, onClose, onTaskCreate }: CreateTaskDialogProps) => {
  const [taskName, setTaskName] = useState("");
  const [selectedColor, setSelectedColor] = useState("#7C3AED");
  const [date, setDate] = useState("Today");
  const [repeat, setRepeat] = useState("No repeat");
  const [time, setTime] = useState("09:00");
  const [timeEnabled, setTimeEnabled] = useState(false);
  const [reminder, setReminder] = useState("No Reminder");
  const [reminderEnabled, setReminderEnabled] = useState(false);
  
  // UI state
  const [showRepeatOptions, setShowRepeatOptions] = useState(false);
  const [showTimeOptions, setShowTimeOptions] = useState(false);
  const [showReminderOptions, setShowReminderOptions] = useState(false);

  const colors = [
    "#EC4899", "#F59E0B", "#EAB308", "#84CC16", 
    "#7C3AED", "#06B6D4", "#A855F7"
  ];

  const repeatOptions = [
    "No repeat",
    "Daily", 
    "Weekly",
    "Monthly",
    "Weekends (Sat, Sun)"
  ];

  const reminderOptions = [
    "No Reminder",
    "At time of event",
    "10 minutes early",
    "30 minutes early", 
    "1 hour early"
  ];

  const handleCreateTask = () => {
    if (!taskName.trim()) {
      toast.error("Please enter a task name");
      return;
    }

    const taskTime = timeEnabled ? time : "Anytime";
    const taskReminder = reminderEnabled ? reminder : "No Reminder";

    const newTask = {
      id: Date.now().toString(),
      name: taskName,
      color: selectedColor,
      date,
      repeat,
      time: taskTime,
      reminder: taskReminder,
      completed: false,
      createdAt: new Date().toISOString()
    };

    onTaskCreate(newTask);
    toast.success("Task created successfully!");
    
    // Reset form
    setTaskName("");
    setSelectedColor("#7C3AED");
    setDate("Today");
    setRepeat("No repeat");
    setTime("09:00");
    setTimeEnabled(false);
    setReminder("No Reminder");
    setReminderEnabled(false);
    setShowRepeatOptions(false);
    setShowTimeOptions(false);
    setShowReminderOptions(false);
    onClose();
  };

  const formatTime = (timeStr: string) => {
    const [hours, minutes] = timeStr.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  const getCurrentDate = () => {
    const today = new Date();
    return today.toLocaleDateString('en-US', { 
      weekday: 'long',
      month: 'short', 
      day: 'numeric' 
    });
  };

  if (showRepeatOptions) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-md bg-gradient-to-br from-wellness-sky/10 to-wellness-lavender/10 rounded-2xl">
          <DialogHeader className="text-center">
            <div className="flex items-center justify-between mb-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowRepeatOptions(false)}
                className="text-wellness-sage-dark hover:bg-wellness-sage/10"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <DialogTitle className="text-xl text-wellness-sage-dark">Set task repeat</DialogTitle>
              <div className="w-10"></div>
            </div>
          </DialogHeader>

          <div className="space-y-3">
            {repeatOptions.map((option) => (
              <div
                key={option}
                onClick={() => {
                  setRepeat(option);
                  setShowRepeatOptions(false);
                }}
                className={`flex items-center justify-between p-4 rounded-xl cursor-pointer transition-all ${
                  repeat === option 
                    ? "bg-wellness-sage/20 border-2 border-wellness-sage" 
                    : "bg-white hover:bg-wellness-sage/10 border border-wellness-sage/20"
                }`}
              >
                <span className="font-medium text-wellness-sage-dark">{option}</span>
                {repeat === option && (
                  <div className="w-6 h-6 rounded-full bg-wellness-sage flex items-center justify-center">
                    <Check className="h-4 w-4 text-white" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  if (showTimeOptions) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-md bg-gradient-to-br from-wellness-sky/10 to-wellness-lavender/10 rounded-2xl">
          <DialogHeader className="text-center">
            <div className="flex items-center justify-between mb-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowTimeOptions(false)}
                className="text-wellness-sage-dark hover:bg-wellness-sage/10"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <DialogTitle className="text-xl text-wellness-sage-dark">Do it at {formatTime(time)} of the day</DialogTitle>
              <div className="w-10"></div>
            </div>
          </DialogHeader>

          <div className="space-y-6">
            <div className="flex items-center justify-between p-4 bg-white rounded-xl border border-wellness-sage/20">
              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-wellness-sage-dark" />
                <div>
                  <div className="font-medium text-wellness-sage-dark">Specified time</div>
                  <div className="text-sm text-wellness-sage-dark/70">Set a specific time to do it</div>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setTimeEnabled(!timeEnabled)}
                className={`w-12 h-6 rounded-full transition-colors ${
                  timeEnabled ? "bg-wellness-sage" : "bg-gray-300"
                }`}
              >
                <div className={`w-4 h-4 rounded-full bg-white transition-transform ${
                  timeEnabled ? "translate-x-3" : "-translate-x-3"
                }`} />
              </Button>
            </div>

            {timeEnabled && (
              <div className="space-y-4">
                <div className="text-center">
                  <Input
                    type="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="text-center text-2xl font-bold border-wellness-sage/30 focus:border-wellness-sage"
                  />
                </div>
              </div>
            )}

            <Button
              onClick={() => setShowTimeOptions(false)}
              className="w-full bg-wellness-sage hover:bg-wellness-sage-dark text-white"
            >
              Confirm Time
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  if (showReminderOptions) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-md bg-gradient-to-br from-wellness-sky/10 to-wellness-lavender/10 rounded-2xl">
          <DialogHeader className="text-center">
            <div className="flex items-center justify-between mb-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowReminderOptions(false)}
                className="text-wellness-sage-dark hover:bg-wellness-sage/10"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <DialogTitle className="text-xl text-wellness-sage-dark">Set reminder</DialogTitle>
              <div className="w-10"></div>
            </div>
          </DialogHeader>

          <div className="space-y-3">
            {reminderOptions.map((option) => (
              <div
                key={option}
                onClick={() => {
                  setReminder(option);
                  setReminderEnabled(option !== "No Reminder");
                  setShowReminderOptions(false);
                }}
                className={`flex items-center justify-between p-4 rounded-xl cursor-pointer transition-all ${
                  reminder === option 
                    ? "bg-wellness-sage/20 border-2 border-wellness-sage" 
                    : "bg-white hover:bg-wellness-sage/10 border border-wellness-sage/20"
                }`}
              >
                <span className="font-medium text-wellness-sage-dark">{option}</span>
                {reminder === option && (
                  <div className="w-6 h-6 rounded-full bg-wellness-sage flex items-center justify-center">
                    <Check className="h-4 w-4 text-white" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-gradient-to-br from-wellness-sky/10 to-wellness-lavender/10 rounded-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="text-center">
          <div className="flex items-center justify-between mb-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="text-wellness-sage-dark hover:bg-wellness-sage/10"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="text-center">
              <div className="mx-auto w-16 h-16 bg-gradient-to-br from-orange-400 to-orange-500 rounded-full flex items-center justify-center mb-2">
                <span className="text-2xl">😊</span>
              </div>
              <DialogTitle className="text-xl text-wellness-sage-dark">New Task</DialogTitle>
              <p className="text-sm text-wellness-sage-dark/70">Tap to rename</p>
            </div>
            <Button
              onClick={handleCreateTask}
              className="bg-wellness-sage hover:bg-wellness-sage-dark text-white px-6"
            >
              Create
            </Button>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Task Name Input */}
          <Input
            placeholder="New Task"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            className="text-center text-lg font-medium border-wellness-sage/30 focus:border-wellness-sage"
          />

          {/* Color Selector */}
          <div className="flex justify-center gap-3">
            {colors.map((color) => (
              <button
                key={color}
                onClick={() => setSelectedColor(color)}
                className={`w-10 h-10 rounded-full border-2 transition-all ${
                  selectedColor === color 
                    ? "border-wellness-sage-dark scale-110 shadow-lg" 
                    : "border-gray-300 hover:scale-105"
                }`}
                style={{ backgroundColor: color }}
              >
                {selectedColor === color && (
                  <Check className="h-5 w-5 text-white mx-auto" />
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
                {date === "Today" ? getCurrentDate() : date} &gt;
              </Badge>
            </div>

            <div 
              onClick={() => setShowRepeatOptions(true)}
              className="flex items-center justify-between p-3 bg-white rounded-lg border border-wellness-sage/20 cursor-pointer hover:bg-wellness-sage/5"
            >
              <div className="flex items-center gap-3">
                <Repeat className="h-5 w-5 text-wellness-sage-dark" />
                <span className="font-medium text-wellness-sage-dark">Repeat</span>
              </div>
              <Badge variant="outline" className="text-wellness-sage-dark">
                {repeat} &gt;
              </Badge>
            </div>

            <div 
              onClick={() => setShowTimeOptions(true)}
              className="flex items-center justify-between p-3 bg-white rounded-lg border border-wellness-sage/20 cursor-pointer hover:bg-wellness-sage/5"
            >
              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-wellness-sage-dark" />
                <span className="font-medium text-wellness-sage-dark">Time</span>
              </div>
              <Badge variant="outline" className="text-wellness-sage-dark">
                {timeEnabled ? formatTime(time) : "Anytime"} &gt;
              </Badge>
            </div>

            <div 
              onClick={() => setShowReminderOptions(true)}
              className="flex items-center justify-between p-3 bg-white rounded-lg border border-wellness-sage/20 cursor-pointer hover:bg-wellness-sage/5"
            >
              <div className="flex items-center gap-3">
                <Bell className="h-5 w-5 text-wellness-sage-dark" />
                <span className="font-medium text-wellness-sage-dark">Reminder</span>
              </div>
              <Badge variant="outline" className="text-wellness-sage-dark">
                {reminder} &gt;
              </Badge>
            </div>
          </div>

          {/* Create Button */}
          <Button
            onClick={handleCreateTask}
            className="w-full bg-wellness-sage hover:bg-wellness-sage-dark text-white py-3 text-lg font-medium"
          >
            Create Task
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateTaskDialog;
