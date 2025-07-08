
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Bell, Trash2, Clock, BellRing, Volume2, Edit, Calendar, Settings, Timer, CheckCircle } from "lucide-react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useToast } from "@/hooks/use-toast";
import AppHeader from "@/components/AppHeader";

interface Reminder {
  id: string;
  title: string;
  message: string;
  time: string;
  frequency: "daily" | "weekly" | "monthly";
  active: boolean;
}

const Reminders = () => {
  const { toast } = useToast();
  const [reminders, setReminders] = useLocalStorage<Reminder[]>("local_reminders", [
    { 
      id: "1", 
      title: "Drink water", 
      message: "Stay hydrated! Time for a refreshing glass of water.", 
      time: "10:00", 
      frequency: "daily",
      active: true 
    },
    { 
      id: "2", 
      title: "Breathing exercise", 
      message: "Take 5 deep breaths and center yourself.", 
      time: "14:00", 
      frequency: "daily",
      active: true 
    },
    { 
      id: "3", 
      title: "Gratitude reflection", 
      message: "Think of 3 things you're grateful for today.", 
      time: "21:00", 
      frequency: "daily",
      active: false 
    }
  ]);
  
  const [newTitle, setNewTitle] = useState("");
  const [newMessage, setNewMessage] = useState("");
  const [newTime, setNewTime] = useState("");
  const [newFrequency, setNewFrequency] = useState<"daily" | "weekly" | "monthly">("daily");
  const [editingReminder, setEditingReminder] = useState<Reminder | null>(null);

  const handleAddReminder = () => {
    if (newTitle.trim() && newTime) {
      const newId = Date.now().toString();
      const reminderData = {
        id: newId,
        title: newTitle.trim(),
        message: newMessage.trim() || "Gentle reminder",
        time: newTime,
        frequency: newFrequency,
        active: true
      };
      
      if (editingReminder) {
        setReminders(prev => prev.map(reminder => 
          reminder.id === editingReminder.id ? { ...reminderData, id: editingReminder.id } : reminder
        ));
        setEditingReminder(null);
      } else {
        setReminders(prev => [...prev, reminderData]);
      }
      
      // Reset form
      setNewTitle("");
      setNewMessage("");
      setNewTime("");
      setNewFrequency("daily");
    }
  };

  const handleEditReminder = (reminder: Reminder) => {
    setEditingReminder(reminder);
    setNewTitle(reminder.title);
    setNewMessage(reminder.message);
    setNewTime(reminder.time);
    setNewFrequency(reminder.frequency);
  };

  const handleCancelEdit = () => {
    setEditingReminder(null);
    setNewTitle("");
    setNewMessage("");
    setNewTime("");
    setNewFrequency("daily");
  };

  const handleToggleReminder = (id: string) => {
    setReminders(prev => prev.map(reminder => 
      reminder.id === id ? { ...reminder, active: !reminder.active } : reminder
    ));
  };

  const handleDeleteReminder = (id: string) => {
    setReminders(prev => prev.filter(reminder => reminder.id !== id));
  };

  const handleSnoozeAll = () => {
    console.log("Snoozing all reminders for 15 minutes");
    toast({
      title: "Reminders Snoozed",
      description: "All reminders snoozed for 15 minutes.",
      duration: 3000,
    });
  };

  const handleMarkAllComplete = () => {
    setReminders(prev => prev.map(reminder => ({ ...reminder, active: false })));
    toast({
      title: "All Complete",
      description: "All reminders marked as complete.",
      duration: 3000,
    });
  };

  const formatTime12Hour = (time24: string) => {
    const [hours, minutes] = time24.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const hour12 = hour % 12 || 12;
    return `${hour12}:${minutes} ${ampm}`;
  };

  const activeCount = reminders.filter(r => r.active).length;
  const dailyReminders = reminders.filter(r => r.frequency === "daily");
  const weeklyReminders = reminders.filter(r => r.frequency === "weekly");
  const monthlyReminders = reminders.filter(r => r.frequency === "monthly");

  // Get upcoming reminders (next 3)
  const upcomingReminders = reminders
    .filter(r => r.active)
    .sort((a, b) => a.time.localeCompare(b.time))
    .slice(0, 3);

  return (
    <div className="space-y-6 px-2 sm:px-0">
      <AppHeader />
      
      {/* Overview - Active block prominent at top */}
      <div className="space-y-4">
        {/* Active Block - Prominent */}
        <Card className="glass-morphism border-wellness-peach/40 bg-wellness-peach/10 hover:shadow-xl transition-all duration-300">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-3 text-lg sm:text-xl text-wellness-peach-dark">
              <div className="p-3 rounded-xl bg-wellness-peach/30">
                <BellRing className="h-5 w-5 sm:h-6 sm:w-6" />
              </div>
              Active Reminders
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="text-center py-2">
              <span className="text-4xl sm:text-5xl font-bold text-wellness-peach-dark">
                {activeCount}
              </span>
              <p className="text-sm text-wellness-sage-dark/70 mt-2">Currently running</p>
            </div>
          </CardContent>
        </Card>

        {/* Daily, Weekly, Monthly - Horizontal on desktop, vertical on mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card className="glass-morphism border-wellness-sky/30 hover:shadow-lg transition-all duration-300">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base text-wellness-sky-dark">
                <div className="p-2 rounded-lg bg-wellness-sky/20">
                  <Clock className="h-4 w-4" />
                </div>
                Daily
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="text-center">
                <span className="text-2xl font-bold text-wellness-sky-dark">
                  {dailyReminders.length}
                </span>
                <p className="text-xs text-wellness-sage-dark/70 mt-1">Every day</p>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-morphism border-wellness-lavender/30 hover:shadow-lg transition-all duration-300">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base text-wellness-lavender-dark">
                <div className="p-2 rounded-lg bg-wellness-lavender/20">
                  <Volume2 className="h-4 w-4" />
                </div>
                Weekly
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="text-center">
                <span className="text-2xl font-bold text-wellness-lavender-dark">
                  {weeklyReminders.length}
                </span>
                <p className="text-xs text-wellness-sage-dark/70 mt-1">Every week</p>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-morphism border-wellness-sage/30 hover:shadow-lg transition-all duration-300">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base text-wellness-sage-dark">
                <div className="p-2 rounded-lg bg-wellness-sage/20">
                  <Calendar className="h-4 w-4" />
                </div>
                Monthly
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="text-center">
                <span className="text-2xl font-bold text-wellness-sage-dark">
                  {monthlyReminders.length}
                </span>
                <p className="text-xs text-wellness-sage-dark/70 mt-1">Every month</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Add/Edit Reminder */}
      <Card className="glass-morphism border-wellness-sage/30 hover:shadow-lg transition-all duration-300">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base sm:text-lg text-wellness-sage-dark">
            <div className="p-2 rounded-lg bg-wellness-sage/20">
              <Plus className="h-4 w-4 sm:h-5 sm:w-5" />
            </div>
            {editingReminder ? "Edit Reminder" : "Create New Reminder"}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              placeholder="Reminder title..."
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="border-wellness-sage/30 focus:border-wellness-sage/50 transition-colors text-sm"
            />
            <Input
              type="time"
              value={newTime}
              onChange={(e) => setNewTime(e.target.value)}
              className="border-wellness-sage/30 focus:border-wellness-sage/50 transition-colors text-sm"
            />
          </div>
          
          <Textarea
            placeholder="Optional message to remind yourself..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="border-wellness-sage/30 focus:border-wellness-sage/50 min-h-[80px] transition-colors text-sm"
          />
          
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              variant={newFrequency === "daily" ? "default" : "outline"}
              onClick={() => setNewFrequency("daily")}
              className={`${newFrequency === "daily" 
                ? "bg-wellness-sky hover:bg-wellness-sky-dark text-white" 
                : "border-wellness-sky text-wellness-sky-dark hover:bg-wellness-sky/10"
              } transition-all text-sm`}
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
              } transition-all text-sm`}
            >
              <Volume2 className="h-4 w-4 mr-2" />
              Weekly
            </Button>
            <Button
              variant={newFrequency === "monthly" ? "default" : "outline"}
              onClick={() => setNewFrequency("monthly")}
              className={`${newFrequency === "monthly" 
                ? "bg-wellness-sage hover:bg-wellness-sage-dark text-white" 
                : "border-wellness-sage text-wellness-sage-dark hover:bg-wellness-sage/10"
              } transition-all text-sm`}
            >
              <Calendar className="h-4 w-4 mr-2" />
              Monthly
            </Button>
            <div className="flex gap-2 sm:ml-auto">
              {editingReminder && (
                <Button 
                  onClick={handleCancelEdit}
                  variant="outline"
                  className="text-gray-600 hover:bg-gray-100 transition-all px-4 text-sm"
                >
                  Cancel
                </Button>
              )}
              <Button 
                onClick={handleAddReminder}
                className="bg-wellness-sage hover:bg-wellness-sage-dark text-white shadow-md hover:shadow-lg transition-all px-6 text-sm"
              >
                <Plus className="h-4 w-4 mr-2" />
                {editingReminder ? "Update Reminder" : "Add Reminder"}
              </Button>
            </div>
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
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${reminder.active ? 'bg-wellness-peach/20' : 'bg-gray-200'}`}>
                      <Bell className={`h-4 w-4 sm:h-5 sm:w-5 ${reminder.active ? 'text-wellness-peach-dark' : 'text-gray-500'}`} />
                    </div>
                    <div className="flex-1">
                      <h3 className={`font-semibold text-base sm:text-lg ${reminder.active ? "text-wellness-sage-dark" : "text-gray-500"}`}>
                        {reminder.title}
                      </h3>
                      <div className="flex flex-wrap items-center gap-2 mt-1">
                        <Badge 
                          variant="outline" 
                          className={`text-xs ${reminder.active ? "border-wellness-peach text-wellness-peach-dark bg-wellness-peach/10" : "border-gray-300 text-gray-500"}`}
                        >
                          <Clock className="h-3 w-3 mr-1" />
                          {formatTime12Hour(reminder.time)}
                        </Badge>
                        <Badge 
                          variant="outline" 
                          className={`text-xs ${reminder.active ? 
                            reminder.frequency === "daily" ? "border-wellness-sky text-wellness-sky-dark bg-wellness-sky/10" :
                            reminder.frequency === "weekly" ? "border-wellness-lavender text-wellness-lavender-dark bg-wellness-lavender/10" :
                            "border-wellness-sage text-wellness-sage-dark bg-wellness-sage/10"
                            : "border-gray-300 text-gray-500"}`}
                        >
                          {reminder.frequency}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  {reminder.message && (
                    <p className={`text-xs sm:text-sm pl-10 sm:pl-12 leading-relaxed ${reminder.active ? "text-wellness-sage-dark/80" : "text-gray-400"}`}>
                      {reminder.message}
                    </p>
                  )}
                </div>
                <div className="flex flex-col sm:flex-row items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleToggleReminder(reminder.id)}
                    className={`${reminder.active 
                      ? "border-wellness-peach text-wellness-peach-dark hover:bg-wellness-peach/10" 
                      : "border-gray-300 text-gray-500 hover:bg-gray-100"
                    } transition-all text-xs`}
                  >
                    {reminder.active ? "Active" : "Inactive"}
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleEditReminder(reminder)}
                    className="text-wellness-sage-dark hover:text-wellness-sage hover:bg-wellness-sage/10 transition-colors"
                  >
                    <Edit className="h-4 w-4" />
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
          <CardContent className="p-8 sm:p-12">
            <div className="space-y-4">
              <Bell className="h-12 w-12 sm:h-16 sm:w-16 text-wellness-peach/50 mx-auto" />
              <h3 className="text-lg sm:text-xl font-medium text-wellness-peach-dark">
                No reminders yet
              </h3>
              <p className="text-wellness-sage-dark/70 max-w-md mx-auto leading-relaxed text-sm">
                Create gentle reminders to support your wellness journey. Small nudges can make a big difference! 🌟
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Up Next Section */}
      <Card className="glass-morphism border-wellness-sky/30 hover:shadow-lg transition-all duration-300">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base sm:text-lg text-wellness-sky-dark">
            <div className="p-2 rounded-lg bg-wellness-sky/20">
              <Clock className="h-4 w-4 sm:h-5 sm:w-5" />
            </div>
            Up Next
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {upcomingReminders.length > 0 ? (
            upcomingReminders.map((reminder) => (
              <div key={reminder.id} className="flex items-center justify-between p-3 rounded-lg bg-wellness-sky/10 border border-wellness-sky/20">
                <div className="flex items-center gap-3">
                  <Bell className="h-4 w-4 text-wellness-sky-dark" />
                  <div>
                    <p className="font-medium text-wellness-sky-dark text-sm">{reminder.title}</p>
                    <p className="text-xs text-wellness-sky-dark/70">{formatTime12Hour(reminder.time)}</p>
                  </div>
                </div>
                <Badge variant="outline" className="border-wellness-sky text-wellness-sky-dark bg-wellness-sky/10 text-xs">
                  {reminder.frequency}
                </Badge>
              </div>
            ))
          ) : (
            <p className="text-wellness-sky-dark/70 text-sm text-center py-4">
              No upcoming reminders. Create one to get started!
            </p>
          )}
        </CardContent>
      </Card>

      {/* Quick Actions - Moved to bottom */}
      <Card className="glass-morphism border-wellness-lavender/30 hover:shadow-lg transition-all duration-300">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base sm:text-lg text-wellness-lavender-dark">
            <div className="p-2 rounded-lg bg-wellness-lavender/20">
              <Settings className="h-4 w-4 sm:h-5 sm:w-5" />
            </div>
            Quick Actions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-3 mb-4">
            <Button
              onClick={handleSnoozeAll}
              className="flex-1 bg-wellness-lavender hover:bg-wellness-lavender-dark text-white transition-all text-sm"
            >
              <Timer className="h-4 w-4 mr-2" />
              Snooze All (15 min)
            </Button>
            <Button
              onClick={handleMarkAllComplete}
              className="flex-1 bg-wellness-sage hover:bg-wellness-sage-dark text-white transition-all text-sm"
            >
              <CheckCircle className="h-4 w-4 mr-2" />
              Mark All Complete
            </Button>
          </div>
          <div className="p-3 bg-wellness-lavender/10 rounded-lg border border-wellness-lavender/20">
            <h4 className="font-medium text-wellness-lavender-dark text-sm mb-2">Smart Notifications</h4>
            <p className="text-xs text-wellness-lavender-dark/70 leading-relaxed">
              Get intelligent reminders based on your daily patterns and wellness goals. Notifications adapt to your schedule for maximum effectiveness.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Reminders;
