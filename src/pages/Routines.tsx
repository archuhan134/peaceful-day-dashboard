
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Plus, Repeat, Trash2, Clock, Sun, Moon, Sparkles } from "lucide-react";
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
  const completionRate = routines.length > 0 ? Math.round((completedCount / routines.length) * 100) : 0;

  const getMotivationalMessage = () => {
    if (completionRate === 100) return "Perfect routine day! You're amazing! 🌟";
    if (completionRate >= 75) return "Excellent consistency! Keep it up! ✨";
    if (completionRate >= 50) return "Great progress on your routines! 💪";
    if (completionRate >= 25) return "Good start! Routines build character! 🌱";
    return "Every routine completed is a step forward! 🚀";
  };

  return (
    <div className="space-y-6">
      <AppHeader />
      
      {/* Progress Overview */}
      <Card className="glass-morphism border-wellness-peach/30 hover:shadow-xl transition-all duration-300">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-wellness-peach-dark">
            <div className="p-2 rounded-lg bg-wellness-peach/20">
              <Repeat className="h-5 w-5" />
            </div>
            Routines Progress Today
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center space-y-2">
              <div className="text-4xl font-bold text-wellness-peach-dark">
                {completedCount}/{routines.length}
              </div>
              <p className="text-sm text-wellness-sage-dark/70">Completed</p>
            </div>
            <div className="text-center space-y-2">
              <div className="text-4xl font-bold text-wellness-sky-dark">{morningRoutines.length}</div>
              <p className="text-sm text-wellness-sage-dark/70">Morning</p>
            </div>
            <div className="text-center space-y-2">
              <div className="text-4xl font-bold text-wellness-lavender-dark">{eveningRoutines.length}</div>
              <p className="text-sm text-wellness-sage-dark/70">Evening</p>
            </div>
          </div>
          <div className="mt-6 space-y-2">
            <div className="w-full bg-wellness-peach/20 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-wellness-peach to-wellness-peach-dark h-3 rounded-full transition-all duration-700"
                style={{ width: `${completionRate}%` }}
              />
            </div>
            <p className="text-center text-sm text-wellness-sage-dark/70">
              {getMotivationalMessage()}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Add New Routine */}
      <Card className="glass-morphism border-wellness-sage/30 hover:shadow-xl transition-all duration-300">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-wellness-sage-dark">
            <div className="p-2 rounded-lg bg-wellness-sage/20">
              <Plus className="h-5 w-5" />
            </div>
            Create New Routine
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                placeholder="New routine name..."
                value={newRoutine}
                onChange={(e) => setNewRoutine(e.target.value)}
                className="border-wellness-sage/30 focus:border-wellness-sage/50 transition-colors"
              />
              <Input
                type="time"
                value={newTime}
                onChange={(e) => setNewTime(e.target.value)}
                className="border-wellness-sage/30 focus:border-wellness-sage/50 transition-colors"
              />
            </div>
            <div className="flex gap-3">
              <Button
                variant={newType === "morning" ? "default" : "outline"}
                onClick={() => setNewType("morning")}
                className={`${newType === "morning" 
                  ? "bg-wellness-sky hover:bg-wellness-sky-dark text-white" 
                  : "border-wellness-sky text-wellness-sky-dark hover:bg-wellness-sky/10"
                } transition-all`}
              >
                <Sun className="h-4 w-4 mr-2" />
                Morning
              </Button>
              <Button
                variant={newType === "evening" ? "default" : "outline"}
                onClick={() => setNewType("evening")}
                className={`${newType === "evening" 
                  ? "bg-wellness-lavender hover:bg-wellness-lavender-dark text-white" 
                  : "border-wellness-lavender text-wellness-lavender-dark hover:bg-wellness-lavender/10"
                } transition-all`}
              >
                <Moon className="h-4 w-4 mr-2" />
                Evening
              </Button>
              <Button 
                onClick={handleAddRoutine}
                className="bg-wellness-sage hover:bg-wellness-sage-dark text-white ml-auto shadow-md hover:shadow-lg transition-all px-6"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Morning Routines */}
      <Card className="glass-morphism border-wellness-sky/30 hover:shadow-xl transition-all duration-300">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-wellness-sky-dark">
            <div className="p-2 rounded-lg bg-wellness-sky/20">
              <Sun className="h-5 w-5" />
            </div>
            Morning Routines ({morningRoutines.filter(r => r.completed).length}/{morningRoutines.length})
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 min-h-[200px]">
          {morningRoutines.length > 0 ? (
            morningRoutines.map((routine) => (
              <div 
                key={routine.id}
                className={`flex items-center justify-between p-4 rounded-xl transition-all hover:scale-[1.01] ${
                  routine.completed 
                    ? "bg-wellness-sky/10 opacity-90 border border-wellness-sky/30" 
                    : "hover:bg-wellness-sky/10 border border-transparent hover:border-wellness-sky/30"
                }`}
              >
                <div className="flex items-center gap-4 flex-1">
                  <Checkbox
                    checked={routine.completed}
                    onCheckedChange={() => handleToggleRoutine(routine.id)}
                    className="data-[state=checked]:bg-wellness-sky data-[state=checked]:border-wellness-sky scale-110"
                  />
                  <div className="flex-1">
                    <span 
                      className={`font-medium text-lg ${
                        routine.completed 
                          ? "line-through text-wellness-sky-dark/60" 
                          : "text-wellness-sky-dark"
                      }`}
                    >
                      {routine.name}
                    </span>
                    {routine.completed && (
                      <p className="text-sm text-wellness-sky-dark/70 mt-1">
                        Great start to your day! ☀️
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge 
                    variant="outline" 
                    className="border-wellness-sky text-wellness-sky-dark bg-wellness-sky/10 px-3 py-1"
                  >
                    <Clock className="h-3 w-3 mr-1" />
                    {routine.time}
                  </Badge>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDeleteRoutine(routine.id)}
                    className="text-red-500 hover:text-red-700 hover:bg-red-50 transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8 space-y-4">
              <Sun className="h-12 w-12 text-wellness-sky/50 mx-auto" />
              <p className="text-wellness-sky-dark/70">No morning routines yet. Start your day right!</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Evening Routines */}
      <Card className="glass-morphism border-wellness-lavender/30 hover:shadow-xl transition-all duration-300">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-wellness-lavender-dark">
            <div className="p-2 rounded-lg bg-wellness-lavender/20">
              <Moon className="h-5 w-5" />
            </div>
            Evening Routines ({eveningRoutines.filter(r => r.completed).length}/{eveningRoutines.length})
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 min-h-[200px]">
          {eveningRoutines.length > 0 ? (
            eveningRoutines.map((routine) => (
              <div 
                key={routine.id}
                className={`flex items-center justify-between p-4 rounded-xl transition-all hover:scale-[1.01] ${
                  routine.completed 
                    ? "bg-wellness-lavender/10 opacity-90 border border-wellness-lavender/30" 
                    : "hover:bg-wellness-lavender/10 border border-transparent hover:border-wellness-lavender/30"
                }`}
              >
                <div className="flex items-center gap-4 flex-1">
                  <Checkbox
                    checked={routine.completed}
                    onCheckedChange={() => handleToggleRoutine(routine.id)}
                    className="data-[state=checked]:bg-wellness-lavender data-[state=checked]:border-wellness-lavender scale-110"
                  />
                  <div className="flex-1">
                    <span 
                      className={`font-medium text-lg ${
                        routine.completed 
                          ? "line-through text-wellness-lavender-dark/60" 
                          : "text-wellness-lavender-dark"
                      }`}
                    >
                      {routine.name}
                    </span>
                    {routine.completed && (
                      <p className="text-sm text-wellness-lavender-dark/70 mt-1">
                        Perfect way to wind down! 🌙
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge 
                    variant="outline" 
                    className="border-wellness-lavender text-wellness-lavender-dark bg-wellness-lavender/10 px-3 py-1"
                  >
                    <Clock className="h-3 w-3 mr-1" />
                    {routine.time}
                  </Badge>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDeleteRoutine(routine.id)}
                    className="text-red-500 hover:text-red-700 hover:bg-red-50 transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8 space-y-4">
              <Moon className="h-12 w-12 text-wellness-lavender/50 mx-auto" />
              <p className="text-wellness-lavender-dark/70">No evening routines yet. End your day peacefully!</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Routines;
