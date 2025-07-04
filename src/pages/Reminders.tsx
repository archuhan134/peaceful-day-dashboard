
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Bell, Trash2, Clock } from "lucide-react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import AppHeader from "@/components/AppHeader";

const Reminders = () => {
  const [reminders, setReminders] = useLocalStorage("reminders", [
    { 
      id: "1", 
      title: "Drink water", 
      message: "Stay hydrated! Time for a glass of water.", 
      time: "10:00 AM", 
      frequency: "daily",
      active: true 
    },
    { 
      id: "2", 
      title: "Breathing exercise", 
      message: "Take 5 deep breaths and center yourself.", 
      time: "2:00 PM", 
      frequency: "daily",
      active: true 
    },
    { 
      id: "3", 
      title: "Gratitude reflection", 
      message: "Think of 3 things you're grateful for today.", 
      time: "9:00 PM", 
      frequency: "daily",
      active: false 
    }
  ]);
  
  const [newTitle, setNewTitle] = useState("");
  const [newMessage, setNewMessage] = useState("");
  const [newTime, setNewTime] = useState("");
  const [newFrequency, setNewFrequency] = useState("daily");

  const handleAddReminder = () => {
    if (newTitle.trim() && newTime) {
      const newId = Date.now().toString();
      setReminders(prev => [...prev, {
        id: newId,
        title: newTitle.trim(),
        message: newMessage.trim() || "Gentle reminder",
        time: newTime,
        frequency: newFrequency,
        active: true
      }]);
      setNewTitle("");
      setNewMessage("");
      setNewTime("");
    }
  };

  const handleToggleReminder = (id: string) => {
    setReminders(prev => prev.map(reminder => 
      reminder.id === id ? { ...reminder, active: !reminder.active } : reminder
    ));
  };

  const handleDeleteReminder = (id: string) => {
    setReminders(prev => prev.filter(reminder => reminder.id !== id));
  };

  const activeCount = reminders.filter(r => r.active).length;

  return (
    <div className="space-y-6">
      <AppHeader />
      
      {/* Overview */}
      <Card className="glass-morphism border-wellness-peach/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-wellness-peach-dark">
            <Bell className="h-5 w-5" />
            Active Reminders
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center">
            <span className="text-3xl font-bold text-wellness-peach-dark">
              {activeCount}
            </span>
            <p className="text-wellness-sage-dark/70 mt-2">Gentle nudges for your wellness</p>
          </div>
        </CardContent>
      </Card>

      {/* Add New Reminder */}
      <Card className="glass-morphism border-wellness-sage/20">
        <CardHeader>
          <CardTitle className="text-wellness-sage-dark">Create New Reminder</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              placeholder="Reminder title..."
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="border-wellness-sage/20"
            />
            <Input
              type="time"
              value={newTime}
              onChange={(e) => setNewTime(e.target.value)}
              className="border-wellness-sage/20"
            />
          </div>
          
          <Textarea
            placeholder="Reminder message (optional)..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="border-wellness-sage/20 min-h-[80px]"
          />
          
          <div className="flex gap-2">
            <Button
              variant={newFrequency === "daily" ? "default" : "outline"}
              onClick={() => setNewFrequency("daily")}
              className={newFrequency === "daily" ? "bg-wellness-sky hover:bg-wellness-sky-dark text-white" : "border-wellness-sky text-wellness-sky-dark"}
            >
              Daily
            </Button>
            <Button
              variant={newFrequency === "weekly" ? "default" : "outline"}
              onClick={() => setNewFrequency("weekly")}
              className={newFrequency === "weekly" ? "bg-wellness-lavender hover:bg-wellness-lavender-dark text-white" : "border-wellness-lavender text-wellness-lavender-dark"}
            >
              Weekly
            </Button>
            <Button 
              onClick={handleAddReminder}
              className="bg-wellness-sage hover:bg-wellness-sage-dark text-white ml-auto"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Reminder
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Reminders List */}
      <div className="grid gap-4">
        {reminders.map((reminder) => (
          <Card 
            key={reminder.id} 
            className={`glass-morphism transition-all duration-200 ${
              reminder.active 
                ? "border-wellness-peach/40 bg-wellness-peach/5" 
                : "border-gray-200 bg-gray-50/50 opacity-75"
            }`}
          >
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className={`font-semibold ${reminder.active ? "text-wellness-sage-dark" : "text-gray-500"}`}>
                      {reminder.title}
                    </h3>
                    <Badge 
                      variant="outline" 
                      className={`${reminder.active ? "border-wellness-peach text-wellness-peach-dark" : "border-gray-300 text-gray-500"}`}
                    >
                      <Clock className="h-3 w-3 mr-1" />
                      {reminder.time}
                    </Badge>
                    <Badge 
                      variant="outline" 
                      className={`${reminder.active ? "border-wellness-sky text-wellness-sky-dark" : "border-gray-300 text-gray-500"}`}
                    >
                      {reminder.frequency}
                    </Badge>
                  </div>
                  {reminder.message && (
                    <p className={`text-sm ${reminder.active ? "text-wellness-sage-dark/70" : "text-gray-400"}`}>
                      {reminder.message}
                    </p>
                  )}
                </div>
                <div className="flex items-center gap-2 ml-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleToggleReminder(reminder.id)}
                    className={`${reminder.active 
                      ? "border-wellness-peach text-wellness-peach-dark hover:bg-wellness-peach/10" 
                      : "border-gray-300 text-gray-500 hover:bg-gray-100"
                    }`}
                  >
                    {reminder.active ? "Active" : "Inactive"}
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDeleteReminder(reminder.id)}
                    className="text-red-500 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Reminders;
