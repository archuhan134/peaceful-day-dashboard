import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Calendar as CalendarIcon, Filter, MoreHorizontal, HelpCircle, Plus, Heart } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import CreateTaskDialog from "@/components/dashboard/CreateTaskDialog";
import { DatePicker } from "@/components/DatePicker";
import { EmptyState } from "@/components/EmptyState";
import { BottomNavigation } from "@/components/BottomNavigation";
import { toast } from "sonner";

const Index = () => {
  const navigate = useNavigate();
  
  // State for dialogs and date selection
  const [showCreateTask, setShowCreateTask] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString());
  
  // Sample data - in a real app this would come from your backend/state
  const [upcomingTasks] = useLocalStorage("upcomingTasks", []);

  // Event handlers
  const handleDateSelect = (date: string) => {
    setSelectedDate(date);
  };

  const handleCreateTask = (newTask: any) => {
    // Add the new task to the tasks list
    const existingTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    const updatedTasks = [...existingTasks, newTask];
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    
    toast.success("Task created successfully!");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-4">
          <div className="w-8 h-1 bg-accent-pink rounded-full"></div>
          <h1 className="text-2xl font-bold text-foreground">Today</h1>
        </div>
        
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" className="text-text-gray">
            <Search className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-text-gray">
            <Filter className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-text-gray">
            <CalendarIcon className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-text-gray">
            <HelpCircle className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Date Picker */}
      <DatePicker selectedDate={selectedDate} onDateSelect={handleDateSelect} />

      {/* Main Content */}
      <div className="flex-1 px-4">
        {upcomingTasks.length === 0 ? (
          <EmptyState onAddActivity={() => setShowCreateTask(true)} />
        ) : (
          <div className="space-y-4">
            {/* Tasks would be displayed here */}
          </div>
        )}
      </div>

      {/* Premium Badge */}
      <div className="fixed bottom-20 left-6">
        <div className="flex items-center gap-2 bg-card px-4 py-2 rounded-full border border-border">
          <Heart className="w-4 h-4 text-accent-pink fill-current" />
          <span className="text-sm font-medium text-foreground">Premium</span>
        </div>
      </div>

      {/* Floating Plus Button */}
      <Button
        onClick={() => setShowCreateTask(true)}
        className="fixed bottom-20 right-6 w-14 h-14 rounded-2xl bg-accent-pink hover:bg-accent-pink/90 text-white shadow-lg"
        size="icon"
      >
        <Plus className="w-6 h-6" />
      </Button>

      {/* Bottom Navigation */}
      <BottomNavigation />

      {/* Create Task Dialog */}
      <CreateTaskDialog
        isOpen={showCreateTask}
        onClose={() => setShowCreateTask(false)}
        onTaskCreate={handleCreateTask}
      />
    </div>
  );
};

export default Index;
