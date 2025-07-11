import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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
  { name: 'Pink', value: '#EC4899' },
  { name: 'Orange', value: '#F59E0B' },
  { name: 'Yellow', value: '#EAB308' },
  { name: 'Green', value: '#10B981' },
  { name: 'Purple', value: '#8B5CF6' },
  { name: 'Teal', value: '#14B8A6' },
  { name: 'Indigo', value: '#6366F1' },
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

const reminderOptions = [
  { label: 'No Reminder', value: 'none' },
  { label: 'At time of event', value: 'at_time' },
  { label: '10 minutes early', value: '10_min' },
  { label: '30 minutes early', value: '30_min' },
  { label: '1 hour early', value: '1_hour' },
  { label: 'Custom', value: 'custom' }
];

const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

export const CreateTaskDialog: React.FC<CreateTaskDialogProps> = ({
  isOpen,
  onClose,
  onSave,
  editingTask
}) => {
  const [taskName, setTaskName] = useState('New Task');
  const [category, setCategory] = useState('General');
  const [priority, setPriority] = useState<'Low' | 'Medium' | 'High'>('Medium');
  const [dueDate, setDueDate] = useState<Date>(new Date()); // Default to today
  const [time, setTime] = useState('Anytime');
  const [reminder, setReminder] = useState(false);
  const [reminderType, setReminderType] = useState('at_time');
  const [customReminderTime, setCustomReminderTime] = useState('9:00 AM');
  const [repeat, setRepeat] = useState<typeof repeatOptions[number]>('No repeat');
  const [customDays, setCustomDays] = useState<string[]>([]);
  const [selectedColor, setSelectedColor] = useState(taskColors[4].value); // Default to purple

  useEffect(() => {
    if (editingTask) {
      setTaskName(editingTask.name);
      setCategory(editingTask.category);
      setPriority(editingTask.priority);
      setDueDate(editingTask.dueDate || new Date());
      setTime(editingTask.time || 'Anytime');
      setReminder(editingTask.reminder || false);
      setRepeat(editingTask.repeat || 'No repeat');
      setCustomDays(editingTask.customDays || []);
      setSelectedColor(editingTask.color || taskColors[4].value);
    } else {
      // Reset form for new task
      setTaskName('New Task');
      setCategory('General');
      setPriority('Medium');
      setDueDate(new Date()); // Default to today
      setTime('Anytime');
      setReminder(false);
      setReminderType('at_time');
      setCustomReminderTime('9:00 AM');
      setRepeat('No repeat');
      setCustomDays([]);
      setSelectedColor(taskColors[4].value);
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

    let reminderTime;
    if (reminder) {
      switch (reminderType) {
        case 'at_time':
          reminderTime = time === 'Anytime' ? '9:00 AM' : time;
          break;
        case '10_min':
          reminderTime = '10 minutes early';
          break;
        case '30_min':
          reminderTime = '30 minutes early';
          break;
        case '1_hour':
          reminderTime = '1 hour early';
          break;
        case 'custom':
          reminderTime = customReminderTime;
          break;
        default:
          reminderTime = undefined;
      }
    }

    const taskData: Omit<Task, 'id' | 'completed'> = {
      name: taskName.trim(),
      category,
      priority,
      dueDate,
      time,
      reminder,
      reminderTime,
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

  const formatDateDisplay = (date: Date) => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return 'Tomorrow';
    } else {
      return format(date, "EEE, MMM d");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="w-full max-w-md mx-4 max-h-[95vh] overflow-y-auto bg-white rounded-3xl p-0 border-0 shadow-2xl">
        {/* Header with Back Button */}
        <div className="sticky top-0 bg-white/95 backdrop-blur-md z-10 rounded-t-3xl">
          <div className="flex items-center justify-between p-4 border-b border-gray-100">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-all"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h3 className="text-lg font-semibold text-gray-900">Create Task</h3>
            <div className="w-9" />
          </div>
        </div>

        {/* Main Content Container */}
        <div className="px-6 py-4">
          {/* Task Icon & Title Section - Compact */}
          <div className="flex flex-col items-center mb-6">
            <div 
              className="w-16 h-16 rounded-full flex items-center justify-center text-3xl mb-3 shadow-lg"
              style={{ backgroundColor: selectedColor }}
            >
              😊
            </div>
            <div className="text-center">
              <h2 className="text-xl font-bold text-gray-900 mb-1">{taskName}</h2>
              <p className="text-xs text-gray-500">Tap to rename</p>
            </div>
          </div>

          {/* Compact Color Selection */}
          <div className="flex justify-center gap-2 mb-6">
            {taskColors.map((color) => (
              <button
                key={color.value}
                onClick={() => setSelectedColor(color.value)}
                className={`w-10 h-10 rounded-full border-2 transition-all ${
                  selectedColor === color.value 
                    ? 'border-gray-800 scale-110 shadow-md' 
                    : 'border-transparent hover:border-gray-300'
                }`}
                style={{ backgroundColor: color.value }}
              >
                {selectedColor === color.value && (
                  <div className="w-full h-full rounded-full flex items-center justify-center text-white text-sm">
                    ✓
                  </div>
                )}
              </button>
            ))}
          </div>

          {/* Task Name Input */}
          <div className="mb-6">
            <Input
              placeholder="New Task"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
              className="text-center text-lg font-semibold border border-gray-200 bg-gray-50 rounded-2xl py-3 px-4 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Form Options */}
          <div className="space-y-3">
            {/* Date */}
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-gray-100">
              <div className="flex items-center gap-3">
                <CalendarIcon className="h-4 w-4 text-gray-600" />
                <span className="font-medium text-gray-700 text-sm">Date</span>
              </div>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="ghost"
                    className="text-gray-600 hover:bg-gray-200 rounded-lg text-sm px-3 py-1"
                  >
                    {formatDateDisplay(dueDate)} →
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="end">
                  <Calendar
                    mode="single"
                    selected={dueDate}
                    onSelect={(date) => date && setDueDate(date)}
                    initialFocus
                    className="pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* Repeat */}
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-gray-100">
              <div className="flex items-center gap-3">
                <Clock className="h-4 w-4 text-gray-600" />
                <span className="font-medium text-gray-700 text-sm">Repeat</span>
              </div>
              <Select value={repeat} onValueChange={(value) => setRepeat(value as typeof repeatOptions[number])}>
                <SelectTrigger className="border-0 bg-transparent hover:bg-gray-200 text-gray-600 w-auto text-sm">
                  <SelectValue />
                  <span className="ml-2">→</span>
                </SelectTrigger>
                <SelectContent>
                  {repeatOptions.map(option => (
                    <SelectItem key={option} value={option}>{option}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Custom Days Selection */}
            {repeat === 'Custom' && (
              <div className="p-3 bg-gray-50 rounded-xl border border-gray-100">
                <Label className="text-xs font-medium text-gray-700 mb-2 block">Select Days</Label>
                <div className="flex flex-wrap gap-2">
                  {weekDays.map(day => (
                    <label key={day} className="flex items-center space-x-1 cursor-pointer">
                      <Checkbox
                        checked={customDays.includes(day)}
                        onCheckedChange={() => handleCustomDayToggle(day)}
                        className="rounded w-4 h-4"
                      />
                      <span className="text-xs">{day.slice(0, 3)}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* Time */}
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-gray-100">
              <div className="flex items-center gap-3">
                <Clock className="h-4 w-4 text-gray-600" />
                <span className="font-medium text-gray-700 text-sm">Time</span>
              </div>
              <Select value={time} onValueChange={setTime}>
                <SelectTrigger className="border-0 bg-transparent hover:bg-gray-200 text-gray-600 w-auto text-sm">
                  <SelectValue />
                  <span className="ml-2">→</span>
                </SelectTrigger>
                <SelectContent>
                  {timeSlots.map(slot => (
                    <SelectItem key={slot} value={slot}>{slot}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Reminder */}
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-gray-100">
              <div className="flex items-center gap-3">
                <Bell className="h-4 w-4 text-gray-600" />
                <span className="font-medium text-gray-700 text-sm">Reminder</span>
              </div>
              <Select 
                value={reminder ? reminderType : 'none'} 
                onValueChange={(value) => {
                  if (value === 'none') {
                    setReminder(false);
                  } else {
                    setReminder(true);
                    setReminderType(value);
                  }
                }}
              >
                <SelectTrigger className="border-0 bg-transparent hover:bg-gray-200 text-gray-600 w-auto text-sm">
                  <SelectValue />
                  <span className="ml-2">→</span>
                </SelectTrigger>
                <SelectContent>
                  {reminderOptions.map(option => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Custom Reminder Time */}
            {reminder && reminderType === 'custom' && (
              <div className="p-3 bg-gray-50 rounded-xl border border-gray-100">
                <Label className="text-xs font-medium text-gray-700 mb-2 block">Custom Reminder Time</Label>
                <Select value={customReminderTime} onValueChange={setCustomReminderTime}>
                  <SelectTrigger className="border-gray-200 text-sm">
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

          {/* Create Button - Fixed at bottom */}
          <div className="sticky bottom-0 bg-white/95 backdrop-blur-md p-4 mt-6 border-t border-gray-100 rounded-b-3xl">
            <Button
              onClick={handleSave}
              disabled={!taskName.trim()}
              className="w-full bg-green-500 hover:bg-green-600 disabled:bg-gray-300 text-white font-semibold py-4 rounded-2xl text-base transition-all"
            >
              Create Task
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};