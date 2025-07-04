
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Plus, Repeat, Trash2, Clock } from "lucide-react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import AppHeader from "@/components/AppHeader";

const Routines = () => {
  const [routines, setRoutines] = useLocalStorage("routines", [
    { id: "1", name: "Morning skincare", completed: false, time: "7:00 AM", type: "morning" },
    { id: "2", name: "Evening wind-down", completed: false, time: "9:00 PM", type: "evening" },
    { id: "3", name: "Workout preparation", completed: false, time: "6:00 AM", type: "morning" },
    { id: "4", name: "Bedtime reading", completed: false, time: "10:00 PM", type: "evening" }
  ]);
  
  const [newRoutine, setNewRoutine] = useState("");
  const [newTime, setNewTime] = useState("");
  const [newType, setNewType] = useState("morning");

  const handleToggleRoutine = (id: string) => {
    setRoutines(prev => prev.map(routine => 
      routine.id === id ? { ...routine, completed: !routine.completed } : routine
    ));
  };

  const handleAddRoutine = () => {
    if (newRoutine.trim()) {
      const newId = Date.now().toString();
      setRoutines(prev => [...prev, {
        id: newId,
        name: newRoutine.trim(),
        completed: false,
        time: newTime || "8:00 AM",
        type: newType
      }]);
      setNewRoutine("");
      setNewTime("");
    }
  };

  const handleDeleteRoutine = (id: string) => {
    setRoutines(prev => prev.filter(routine => routine.id !== id));
  };

  const morningRoutines = routines.filter(r => r.type === "morning");
  const eveningRoutines = routines.filter(r => r.type === "evening");
  const completedCount = routines.filter(r => r.completed).length;

  return (
    <div className="space-y-6">
      <AppHeader />
      
      {/* Progress Overview */}
      <Card className="glass-morphism border-wellness-peach/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-wellness-peach-dark">
            <Repeat className="h-5 w-5" />
            Routines Completed Today
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center">
            <span className="text-3xl font-bold text-wellness-peach-dark">
              {completedCount}/{routines.length}
            </span>
            <p className="text-wellness-sage-dark/70 mt-2">Keep up the consistency!</p>
          </div>
        </CardContent>
      </Card>

      {/* Add New Routine */}
      <Card className="glass-morphism border-wellness-sage/20">
        <CardContent className="pt-6">
          <div className="space-y-3">
            <div className="flex gap-2">
              <Input
                placeholder="Add a new routine..."
                value={newRoutine}
                onChange={(e) => setNewRoutine(e.target.value)}
                className="border-wellness-sage/20 flex-1"
              />
              <Input
                type="time"
                value={newTime}
                onChange={(e) => setNewTime(e.target.value)}
                className="border-wellness-sage/20 w-32"
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant={newType === "morning" ? "default" : "outline"}
                onClick={() => setNewType("morning")}
                className={newType === "morning" ? "bg-wellness-sky hover:bg-wellness-sky-dark text-white" : "border-wellness-sky text-wellness-sky-dark"}
              >
                Morning
              </Button>
              <Button
                variant={newType === "evening" ? "default" : "outline"}
                onClick={() => setNewType("evening")}
                className={newType === "evening" ? "bg-wellness-lavender hover:bg-wellness-lavender-dark text-white" : "border-wellness-lavender text-wellness-lavender-dark"}
              >
                Evening
              </Button>
              <Button 
                onClick={handleAddRoutine}
                className="bg-wellness-sage hover:bg-wellness-sage-dark text-white ml-auto"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Morning Routines */}
      <Card className="glass-morphism border-wellness-sky/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-wellness-sky-dark">
            <Clock className="h-5 w-5" />
            Morning Routines
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {morningRoutines.map((routine) => (
            <div 
              key={routine.id}
              className={`flex items-center justify-between p-3 rounded-lg transition-all ${
                routine.completed 
                  ? "bg-wellness-sky/10 opacity-75" 
                  : "hover:bg-wellness-sky/10"
              }`}
            >
              <div className="flex items-center gap-3">
                <Checkbox
                  checked={routine.completed}
                  onCheckedChange={() => handleToggleRoutine(routine.id)}
                />
                <span 
                  className={`font-medium ${
                    routine.completed 
                      ? "line-through text-wellness-sky-dark/60" 
                      : "text-wellness-sky-dark"
                  }`}
                >
                  {routine.name}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="border-wellness-sky text-wellness-sky-dark">
                  {routine.time}
                </Badge>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDeleteRoutine(routine.id)}
                  className="text-red-500 hover:text-red-700 hover:bg-red-50"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Evening Routines */}
      <Card className="glass-morphism border-wellness-lavender/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-wellness-lavender-dark">
            <Clock className="h-5 w-5" />
            Evening Routines
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {eveningRoutines.map((routine) => (
            <div 
              key={routine.id}
              className={`flex items-center justify-between p-3 rounded-lg transition-all ${
                routine.completed 
                  ? "bg-wellness-lavender/10 opacity-75" 
                  : "hover:bg-wellness-lavender/10"
              }`}
            >
              <div className="flex items-center gap-3">
                <Checkbox
                  checked={routine.completed}
                  onCheckedChange={() => handleToggleRoutine(routine.id)}
                />
                <span 
                  className={`font-medium ${
                    routine.completed 
                      ? "line-through text-wellness-lavender-dark/60" 
                      : "text-wellness-lavender-dark"
                  }`}
                >
                  {routine.name}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="border-wellness-lavender text-wellness-lavender-dark">
                  {routine.time}
                </Badge>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDeleteRoutine(routine.id)}
                  className="text-red-500 hover:text-red-700 hover:bg-red-50"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default Routines;
