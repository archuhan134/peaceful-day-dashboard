
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Bell, Trash2, Clock, BellRing, Volume2 } from "lucide-react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import AppHeader from "@/components/AppHeader";

const Reminders = () => {
  const [reminders, setReminders] = useLocalStorage("reminders", [
    { 
      id: "1", 
      title: "Drink water", 
      message: "Stay hydrated! Time for a refreshing glass of water.", 
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
  const dailyReminders = reminders.filter(r => r.frequency === "daily");
  const weeklyReminders = reminders.filter(r => r.frequency === "weekly");

  return (
    <div className="space-y-6">
      <AppHeader />
      
      {/* Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="glass-morphism border-wellness-peach/30 hover:shadow-xl transition-all duration-300">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-3 text-wellness-peach-dark">
              <div className="p-2 rounded-lg bg-wellness-peach/20">
                <BellRing className="h-5 w-5" />
              </div>
              Active
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <span className="text-4xl font-bold text-wellness-peach-dark">
                {activeCount}
              </span>
              <p className="text-sm text-wellness-sage-dark/70 mt-2">Reminders running</p>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-morphism border-wellness-sky/30 hover:shadow-xl transition-all duration-300">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-3 text-wellness-sky-dark">
              <div className="p-2 rounded-lg bg-wellness-sky/20">
                <Clock className="h-5 w-5" />
              </div>
              Daily
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <span className="text-4xl font-bold text-wellness-sky-dark">
                {dailyReminders.length}
              </span>
              <p className="text-sm text-wellness-sage-dark/70 mt-2">Every day</p>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-morphism border-wellness-lavender/30 hover:shadow-xl transition-all duration-300">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-3 text-wellness-lavender-dark">
              <div className="p-2 rounded-lg bg-wellness-lavender/20">
                <Volume2 className="h-5 w-5" />
              </div>
              Weekly
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <span className="text-4xl font-bold text-wellness-lavender-dark">
                {weeklyReminders.length}
              </span>
              <p className="text-sm text-wellness-sage-dark/70 mt-2">Every week</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Add New Reminder */}
      <Card className="glass-morphism border-wellness-sage/30 hover:shadow-xl transition-all duration-300">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-wellness-sage-dark">
            <div className="p-2 rounded-lg bg-wellness-sage/20">
              <Plus className="h-5 w-5" />
            </div>
            Create New Reminder
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              placeholder="Reminder title..."
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="border-wellness-sage/30 focus:border-wellness-sage/50 transition-colors"
            />
            <Input
              type="time"
              value={newTime}
              onChange={(e) => setNewTime(e.target.value)}
              className="border-wellness-sage/30 focus:border-wellness-sage/50 transition-colors"
            />
          </div>
          
          <Textarea
            placeholder="Optional message to remind yourself..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="border-wellness-sage/30 focus:border-wellness-sage/50 min-h-[100px] transition-colors"
          />
          
          <div className="flex gap-3">
            <Button
              variant={newFrequency === "daily" ? "default" : "outline"}
              onClick={() => setNewFrequency("daily")}
              className={`${newFrequency === "daily" 
                ? "bg-wellness-sky hover:bg-wellness-sky-dark text-white" 
                : "border-wellness-sky text-wellness-sky-dark hover:bg-wellness-sky/10"
              } transition-all`}
            >
              <Clock className="h-4 w-4 mr-2" />
              Daily
            </Button>
            <Button
              variant={newFrequency === "weekly" ? "default" : "outline"}
              onClick={() => setNewFrequency("weekly")}
              className={`${newFrequency === "weekly" 
                ? "bg-wellness-lavender hover:bg-wellness-lavender-dark text-white" 
                : "border-wellness-lavender text-wellness-lavender-dark hover:bg-wellness-lavender/10"
              } transition-all`}
            >
              <Volume2 className="h-4 w-4 mr-2" />
              Weekly
            </Button>
            <Button 
              onClick={handleAddReminder}
              className="bg-wellness-sage hover:bg-wellness-sage-dark text-white ml-auto shadow-md hover:shadow-lg transition-all px-6"
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
            className={`glass-morphism transition-all duration-300 hover:scale-[1.01] ${
              reminder.active 
                ? "border-wellness-peach/40 bg-wellness-peach/5 shadow-lg hover:shadow-xl" 
                : "border-gray-200 bg-gray-50/50 opacity-75 hover:opacity-90"
            }`}
          >
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1 space-y-3">
                  <div className="flex items-center gap-4">
                    <div className={`p-2 rounded-lg ${reminder.active ? 'bg-wellness-peach/20' : 'bg-gray-200'}`}>
                      <Bell className={`h-5 w-5 ${reminder.active ? 'text-wellness-peach-dark' : 'text-gray-500'}`} />
                    </div>
                    <div className="flex-1">
                      <h3 className={`font-semibold text-lg ${reminder.active ? "text-wellness-sage-dark" : "text-gray-500"}`}>
                        {reminder.title}
                      </h3>
                      <div className="flex items-center gap-3 mt-1">
                        <Badge 
                          variant="outline" 
                          className={`${reminder.active ? "border-wellness-peach text-wellness-peach-dark bg-wellness-peach/10" : "border-gray-300 text-gray-500"}`}
                        >
                          <Clock className="h-3 w-3 mr-1" />
                          {reminder.time}
                        </Badge>
                        <Badge 
                          variant="outline" 
                          className={`${reminder.active ? "border-wellness-sky text-wellness-sky-dark bg-wellness-sky/10" : "border-gray-300 text-gray-500"}`}
                        >
                          {reminder.frequency}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  {reminder.message && (
                    <p className={`text-sm pl-12 leading-relaxed ${reminder.active ? "text-wellness-sage-dark/80" : "text-gray-400"}`}>
                      {reminder.message}
                    </p>
                  )}
                </div>
                <div className="flex items-center gap-3 ml-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleToggleReminder(reminder.id)}
                    className={`${reminder.active 
                      ? "border-wellness-peach text-wellness-peach-dark hover:bg-wellness-peach/10" 
                      : "border-gray-300 text-gray-500 hover:bg-gray-100"
                    } transition-all`}
                  >
                    {reminder.active ? "Active" : "Inactive"}
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDeleteReminder(reminder.id)}
                    className="text-red-500 hover:text-red-700 hover:bg-red-50 transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {reminders.length === 0 && (
        <Card className="glass-morphism border-wellness-peach/20 text-center">
          <CardContent className="p-12">
            <div className="space-y-4">
              <Bell className="h-16 w-16 text-wellness-peach/50 mx-auto" />
              <h3 className="text-xl font-medium text-wellness-peach-dark">
                No reminders yet
              </h3>
              <p className="text-wellness-sage-dark/70 max-w-md mx-auto leading-relaxed">
                Create gentle reminders to support your wellness journey. Small nudges can make a big difference! 🌟
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Reminders;
