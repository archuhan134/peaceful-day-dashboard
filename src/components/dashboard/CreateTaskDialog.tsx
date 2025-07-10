
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft, Calendar as CalendarIcon, Clock, Bell, X, Plus } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

export interface Task {
  id: string;
  name: string;
  description?: string;
  category: string;
  priority: 'Low' | 'Medium' | 'High';
  dueDate?: Date;
  time?: string;
  reminder?: boolean;
  reminderTime?: string;
  repeat?: 'No repeat' | 'Daily' | 'Weekly' | 'Monthly' | 'Weekends' | 'Custom';
  customDays?: string[];
  color?: string;
  completed: boolean;
}

interface CreateTaskDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (task: Omit<Task, 'id' | 'completed'>) => void;
  editingTask?: Task | null;
}

const taskColors = [
  { name: 'Purple', value: '#7C3AED' },
  { name: 'Blue', value: '#2563EB' },
  { name: 'Green', value: '#059669' },
  { name: 'Orange', value: '#EA580C' },
  { name: 'Pink', value: '#DC2626' },
  { name: 'Teal', value: '#0891B2' },
];

const categories = [
  'Work', 'Personal', 'Health', 'Education', 'Finance', 'Social', 'Hobbies', 'General'
];

const repeatOptions = [
  'No repeat', 'Daily', 'Weekly', 'Monthly', 'Weekends', 'Custom'
] as const;

const timeSlots = [
  '6:00 AM', '7:00 AM', '8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM',
  '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM',
  '6:00 PM', '7:00 PM', '8:00 PM', '9:00 PM', '10:00 PM', 'Anytime'
];

const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

export const CreateTaskDialog: React.FC<CreateTaskDialogProps> = ({
  isOpen,
  onClose,
  onSave,
  editingTask
}) => {
  const [taskName, setTaskName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('General');
  const [priority, setPriority] = useState<'Low' | 'Medium' | 'High'>('Medium');
  const [dueDate, setDueDate] = useState<Date>();
  const [time, setTime] = useState('Anytime');
  const [reminder, setReminder] = useState(false);
  const [reminderTime, setReminderTime] = useState('9:00 AM');
  const [repeat, setRepeat] = useState<typeof repeatOptions[number]>('No repeat');
  const [customDays, setCustomDays] = useState<string[]>([]);
  const [selectedColor, setSelectedColor] = useState(taskColors[0].value);

  useEffect(() => {
    if (editingTask) {
      setTaskName(editingTask.name);
      setDescription(editingTask.description || '');
      setCategory(editingTask.category);
      setPriority(editingTask.priority);
      setDueDate(editingTask.dueDate);
      setTime(editingTask.time || 'Anytime');
      setReminder(editingTask.reminder || false);
      setReminderTime(editingTask.reminderTime || '9:00 AM');
      setRepeat(editingTask.repeat || 'No repeat');
      setCustomDays(editingTask.customDays || []);
      setSelectedColor(editingTask.color || taskColors[0].value);
    } else {
      // Reset form for new task
      setTaskName('');
      setDescription('');
      setCategory('General');
      setPriority('Medium');
      setDueDate(new Date()); // Default to today
      setTime('Anytime');
      setReminder(false);
      setReminderTime('9:00 AM');
      setRepeat('No repeat');
      setCustomDays([]);
      setSelectedColor(taskColors[0].value);
    }
  }, [editingTask, isOpen]);

  const handleCustomDayToggle = (day: string) => {
    setCustomDays(prev => 
      prev.includes(day) 
        ? prev.filter(d => d !== day)
        : [...prev, day]
    );
  };

  const handleSave = () => {
    if (!taskName.trim()) return;

    const taskData: Omit<Task, 'id' | 'completed'> = {
      name: taskName.trim(),
      description: description.trim(),
      category,
      priority,
      dueDate,
      time,
      reminder,
      reminderTime: reminder ? reminderTime : undefined,
      repeat,
      customDays: repeat === 'Custom' ? customDays : undefined,
      color: selectedColor
    };

    onSave(taskData);
    onClose();
  };

  const handleClose = () => {
    onClose();
  };

  const handleRepeatChange = (value: string) => {
    setRepeat(value as typeof repeatOptions[number]);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto">
        <DialogHeader className="space-y-4">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClose}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <DialogTitle className="text-lg font-semibold text-center flex-1">
              {editingTask ? 'Edit Task' : 'Create New Task'}
            </DialogTitle>
            <div className="w-9" /> {/* Spacer for balance */}
          </div>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Task Name */}
          <div className="space-y-2">
            <Label htmlFor="taskName">Task Name</Label>
            <Input
              id="taskName"
              placeholder="Enter task name"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
              className="border-wellness-sage/30 focus:border-wellness-sage/50"
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description (Optional)</Label>
            <Textarea
              id="description"
              placeholder="Add details about your task"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border-wellness-sage/30 focus:border-wellness-sage/50 min-h-[80px]"
            />
          </div>

          {/* Category */}
          <div className="space-y-2">
            <Label>Category</Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="border-wellness-sage/30 focus:border-wellness-sage/50">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {categories.map(cat => (
                  <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Priority */}
          <div className="space-y-2">
            <Label>Priority</Label>
            <Select value={priority} onValueChange={(value: 'Low' | 'Medium' | 'High') => setPriority(value)}>
              <SelectTrigger className="border-wellness-sage/30 focus:border-wellness-sage/50">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Low">Low</SelectItem>
                <SelectItem value="Medium">Medium</SelectItem>
                <SelectItem value="High">High</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Due Date */}
          <div className="space-y-2">
            <Label>Due Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal border-wellness-sage/30 hover:border-wellness-sage/50",
                    !dueDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {dueDate ? format(dueDate, "PPP") : "Pick a date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={dueDate}
                  onSelect={setDueDate}
                  initialFocus
                  defaultMonth={new Date()}
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Time */}
          <div className="space-y-2">
            <Label>Time</Label>
            <Select value={time} onValueChange={setTime}>
              <SelectTrigger className="border-wellness-sage/30 focus:border-wellness-sage/50">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {timeSlots.map(slot => (
                  <SelectItem key={slot} value={slot}>{slot}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Repeat */}
          <div className="space-y-3">
            <Label>Repeat</Label>
            <Select value={repeat} onValueChange={handleRepeatChange}>
              <SelectTrigger className="border-wellness-sage/30 focus:border-wellness-sage/50">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {repeatOptions.map(option => (
                  <SelectItem key={option} value={option}>{option}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Custom Days Selection */}
            {repeat === 'Custom' && (
              <div className="space-y-2">
                <Label className="text-sm">Select Days</Label>
                <div className="flex flex-wrap gap-2">
                  {weekDays.map(day => (
                    <div key={day} className="flex items-center space-x-2">
                      <Checkbox
                        id={day}
                        checked={customDays.includes(day)}
                        onCheckedChange={() => handleCustomDayToggle(day)}
                      />
                      <Label
                        htmlFor={day}
                        className="text-sm font-normal cursor-pointer"
                      >
                        {day.slice(0, 3)}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Reminder */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label htmlFor="reminder">Reminder</Label>
              <Switch
                id="reminder"
                checked={reminder}
                onCheckedChange={setReminder}
              />
            </div>

            {reminder && (
              <div className="space-y-2">
                <Label>Reminder Time</Label>
                <Select value={reminderTime} onValueChange={setReminderTime}>
                  <SelectTrigger className="border-wellness-sage/30 focus:border-wellness-sage/50">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {timeSlots.filter(slot => slot !== 'Anytime').map(slot => (
                      <SelectItem key={slot} value={slot}>{slot}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>

          {/* Task Color */}
          <div className="space-y-2">
            <Label>Task Color</Label>
            <div className="flex gap-2 flex-wrap">
              {taskColors.map(color => (
                <button
                  key={color.value}
                  onClick={() => setSelectedColor(color.value)}
                  className={`w-8 h-8 rounded-full border-2 transition-all ${
                    selectedColor === color.value 
                      ? 'border-gray-400 scale-110' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  style={{ backgroundColor: color.value }}
                  title={color.name}
                />
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <Button
              variant="outline"
              onClick={handleClose}
              className="flex-1 border-gray-300 hover:bg-gray-50"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              disabled={!taskName.trim()}
              className="flex-1 bg-wellness-sage hover:bg-wellness-sage-dark text-white"
            >
              {editingTask ? 'Update Task' : 'Create Task'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
