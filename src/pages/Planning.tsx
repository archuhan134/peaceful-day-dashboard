import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Plus, List, Calendar, CheckCircle, Clock, Sparkles, Edit, Repeat, Heart, Star } from "lucide-react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import AppHeader from "@/components/AppHeader";
import { CreateTaskDialog, Task } from "@/components/planning/CreateTaskDialog";
import { CreateRoutineDialog, Routine } from "@/components/planning/CreateRoutineDialog";

const Planning = () => {
  const [newTask, setNewTask] = useState('');
  const [isTaskDialogOpen, setIsTaskDialogOpen] = useState(false);
  const [isRoutineDialogOpen, setIsRoutineDialogOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [editingRoutine, setEditingRoutine] = useState<Routine | null>(null);
  
  // Wellness tracking states
  const [wellnessRating, setWellnessRating] = useLocalStorage("wellness-rating", 5);
  const [dailyReflection, setDailyReflection] = useLocalStorage("daily_reflection", "");

  const [tasks, setTasks] = useLocalStorage("local_tasks", [
    { id: "1", name: "Review weekly goals", completed: false },
    { id: "2", name: "Team meeting prep", completed: false },
    { id: "3", name: "Grocery shopping", completed: false },
    { id: "4", name: "Call family", completed: false }
  ]);

  const [dailyTasks, setDailyTasks] = useLocalStorage<Task[]>("local_daily_tasks", []);
  const [routines, setRoutines] = useLocalStorage<Routine[]>("local_routines", [
    {
      id: "1",
      name: "Morning Routine",
      timeBlock: "Morning",
      tasks: ["Meditation", "Exercise", "Healthy breakfast"]
    }
  ]);

  const handleAddTask = () => {
    if (newTask.trim()) {
      const task = {
        id: Date.now().toString(),
        name: newTask.trim(),
        completed: false
      };
      setTasks(prev => [task, ...prev]);
      setNewTask('');
    }
  };

  const handleTaskToggle = (id: string) => {
    setTasks(prev => prev.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const handleDeleteTask = (id: string) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  };

  const handleSaveTask = (taskData: Omit<Task, 'id' | 'completed'>) => {
    if (editingTask) {
      setDailyTasks(prev => prev.map(task => 
        task.id === editingTask.id 
          ? { ...task, ...taskData }
          : task
      ));
      setEditingTask(null);
    } else {
      const newTask: Task = {
        id: Date.now().toString(),
        ...taskData,
        completed: false
      };
      setDailyTasks(prev => [...prev, newTask]);
    }
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setIsTaskDialogOpen(true);
  };

  const handleDeleteDailyTask = (id: string) => {
    setDailyTasks(prev => prev.filter(task => task.id !== id));
  };

  const handleToggleDailyTask = (id: string) => {
    setDailyTasks(prev => prev.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const handleSaveRoutine = (routineData: Omit<Routine, 'id'>) => {
    if (editingRoutine) {
      setRoutines(prev => prev.map(routine => 
        routine.id === editingRoutine.id 
          ? { ...routine, ...routineData }
          : routine
      ));
      setEditingRoutine(null);
    } else {
      const newRoutine: Routine = {
        id: Date.now().toString(),
        ...routineData
      };
      setRoutines(prev => [...prev, newRoutine]);
    }
  };

  const handleEditRoutine = (routine: Routine) => {
    setEditingRoutine(routine);
    setIsRoutineDialogOpen(true);
  };

  const handleDeleteRoutine = (id: string) => {
    setRoutines(prev => prev.filter(routine => routine.id !== id));
  };

  const pendingTasks = tasks.filter(t => !t.completed);
  const completedTasks = tasks.filter(t => t.completed);
  const completionRate = tasks.length > 0 ? Math.round((completedTasks.length / tasks.length) * 100) : 0;

  const getMotivationalMessage = () => {
    if (completionRate === 100) return "Perfect day! You've accomplished everything! 🎉";
    if (completionRate >= 75) return "Fantastic progress! Almost there! 🌟";
    if (completionRate >= 50) return "You're doing great! Keep the momentum! 💪";
    if (completionRate >= 25) return "Good start! Every task completed is a win! ✨";
    return "Let's make today productive! You've got this! 🚀";
  };

  const getPriorityColor = (priority: Task['priority']) => {
    switch (priority) {
      case 'High': return 'text-red-600 bg-red-50 border-red-200';
      case 'Medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'Low': return 'text-green-600 bg-green-50 border-green-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const tasksByCategory = dailyTasks.reduce((acc, task) => {
    if (!acc[task.category]) {
      acc[task.category] = [];
    }
    acc[task.category].push(task);
    return acc;
  }, {} as Record<string, Task[]>);

  const handleWellnessRatingChange = (rating: number) => {
    setWellnessRating(rating);
  };

  return (
    <div className="space-y-4 sm:space-y-6 px-2 sm:px-0">
      <AppHeader />

      {/* Wellness Check-in Section */}
      <Card className="glass-morphism border-wellness-peach/30 hover:shadow-lg transition-all duration-300">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base sm:text-lg text-wellness-peach-dark">
            <div className="p-2 rounded-lg bg-wellness-peach/20">
              <Heart className="h-4 w-4 sm:h-5 sm:w-5" />
            </div>
            Wellness Check-in
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p className="text-sm text-wellness-sage-dark/70 mb-3">How are you feeling today?</p>
            <div className="flex gap-2 justify-center">
              {[1, 2, 3, 4, 5].map((rating) => (
                <button
                  key={rating}
                  onClick={() => handleWellnessRatingChange(rating)}
                  className={`p-2 rounded-lg transition-all ${
                    wellnessRating >= rating 
                      ? "text-yellow-500" 
                      : "text-gray-300 hover:text-yellow-400"
                  }`}
                >
                  <Star className="h-5 w-5 sm:h-6 sm:w-6" fill={wellnessRating >= rating ? "currentColor" : "none"} />
                </button>
              ))}
            </div>
          </div>
          
          <div>
            <p className="text-sm text-wellness-sage-dark/70 mb-2">Daily Reflection</p>
            <Textarea
              placeholder="What's on your mind today? Any thoughts or feelings you'd like to capture..."
              value={dailyReflection}
              onChange={(e) => setDailyReflection(e.target.value)}
              className="border-wellness-peach/30 focus:border-wellness-peach/50 min-h-[80px] text-sm"
            />
          </div>
        </CardContent>
      </Card>

      {/* Progress Overview */}
      <Card className="glass-morphism border-wellness-sage/30 hover:shadow-lg transition-all duration-300">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base sm:text-lg text-wellness-sage-dark">
            <div className="p-2 rounded-lg bg-wellness-sage/20">
              <Calendar className="h-4 w-4 sm:h-5 sm:w-5" />
            </div>
            Today's Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center space-y-1">
              <div className="text-2xl sm:text-3xl font-bold text-wellness-sky-dark">{tasks.length}</div>
              <p className="text-xs sm:text-sm text-wellness-sage-dark/70">Total Tasks</p>
            </div>
            <div className="text-center space-y-1">
              <div className="text-2xl sm:text-3xl font-bold text-wellness-lavender-dark">{completedTasks.length}</div>
              <p className="text-xs sm:text-sm text-wellness-sage-dark/70">Completed</p>
            </div>
            <div className="text-center space-y-1">
              <div className="text-2xl sm:text-3xl font-bold text-wellness-peach-dark">{completionRate}%</div>
              <p className="text-xs sm:text-sm text-wellness-sage-dark/70">Progress</p>
            </div>
          </div>
          <div className="mt-4 space-y-2">
            <div className="w-full bg-wellness-sage/20 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-wellness-sage to-wellness-sage-dark h-2 rounded-full transition-all duration-700"
                style={{ width: `${completionRate}%` }}
              />
            </div>
            <p className="text-center text-xs sm:text-sm text-wellness-sage-dark/70">
              {getMotivationalMessage()}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Quick Add Task */}
      <Card className="glass-morphism border-wellness-sky/30 hover:shadow-lg transition-all duration-300">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base sm:text-lg text-wellness-sky-dark">
            <div className="p-2 rounded-lg bg-wellness-sky/20">
              <Plus className="h-4 w-4 sm:h-5 sm:w-5" />
            </div>
            Quick Add Task
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-3">
            <Input
              placeholder="What would you like to accomplish today?"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAddTask()}
              className="border-wellness-sky/30 focus:border-wellness-sky/50 transition-colors text-sm flex-1"
            />
            <Button 
              onClick={handleAddTask}
              className="bg-wellness-sky hover:bg-wellness-sky-dark text-white shadow-md hover:shadow-lg transition-all px-6 text-sm"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add
            </Button>
          </div>
          <div className="mt-4 flex flex-col sm:flex-row gap-3">
            <Button 
              onClick={() => setIsTaskDialogOpen(true)}
              className="bg-black hover:bg-gray-800 text-white rounded-xl px-4 py-2 text-sm"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Detailed Task
            </Button>
            <Button 
              onClick={() => setIsRoutineDialogOpen(true)}
              variant="outline"
              className="border-wellness-lavender/30 text-wellness-lavender-dark hover:bg-wellness-lavender/10 rounded-xl px-4 py-2 text-sm"
            >
              <Repeat className="h-4 w-4 mr-2" />
              Create Routine
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Routines Section */}
      {routines.length > 0 && (
        <Card className="glass-morphism border-wellness-lavender/30 hover:shadow-xl transition-all duration-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-wellness-lavender-dark">
              <div className="p-2 rounded-lg bg-wellness-lavender/20">
                <Repeat className="h-5 w-5" />
              </div>
              My Routines
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {routines.map((routine) => (
              <div key={routine.id} className="p-4 rounded-xl bg-wellness-lavender/10 border border-wellness-lavender/20">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h3 className="font-semibold text-wellness-lavender-dark">{routine.name}</h3>
                    <Badge className="mt-1 bg-wellness-lavender/20 text-wellness-lavender-dark border-wellness-lavender/30">
                      {routine.timeBlock}
                    </Badge>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEditRoutine(routine)}
                      className="text-wellness-lavender-dark hover:bg-wellness-lavender/20"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteRoutine(routine.id)}
                      className="text-red-500 hover:text-red-700 hover:bg-red-50"
                    >
                      Delete
                    </Button>
                  </div>
                </div>
                <div className="space-y-2">
                  {routine.tasks.map((task, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm text-wellness-lavender-dark/80">
                      <div className="w-1.5 h-1.5 rounded-full bg-wellness-lavender/60" />
                      {task}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Daily Tasks by Category */}
      {Object.keys(tasksByCategory).length > 0 && (
        <div className="space-y-6">
          {Object.entries(tasksByCategory).map(([category, categoryTasks]) => (
            <Card key={category} className="glass-morphism border-wellness-peach/30 hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-wellness-peach-dark">
                  <div className="p-2 rounded-lg bg-wellness-peach/20">
                    <List className="h-5 w-5" />
                  </div>
                  {category} ({categoryTasks.length})
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {categoryTasks.map((task) => (
                  <div
                    key={task.id}
                    className={`flex items-center gap-3 p-4 rounded-xl transition-all hover:scale-[1.01] border ${
                      task.completed 
                        ? "bg-wellness-peach/10 opacity-75 border-wellness-peach/20" 
                        : "hover:bg-wellness-peach/10 border-transparent hover:border-wellness-peach/30"
                    }`}
                  >
                    <Checkbox
                      checked={task.completed}
                      onCheckedChange={() => handleToggleDailyTask(task.id)}
                      className="data-[state=checked]:bg-wellness-peach data-[state=checked]:border-wellness-peach"
                    />
                    <div className="flex-1">
                      <div className={`font-medium ${task.completed ? "line-through text-wellness-peach-dark/60" : "text-wellness-peach-dark"}`}>
                        {task.name}
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        {task.time && (
                          <span className="text-xs text-wellness-peach-dark/60">
                            {task.time}
                          </span>
                        )}
                        <Badge className={`text-xs ${getPriorityColor(task.priority)}`}>
                          {task.priority}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEditTask(task)}
                        className="text-wellness-peach-dark hover:bg-wellness-peach/20"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteDailyTask(task.id)}
                        className="text-red-500 hover:text-red-700 hover:bg-red-50"
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Original Tasks Lists */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pending Tasks */}
        <Card className="glass-morphism border-wellness-lavender/30 hover:shadow-xl transition-all duration-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-wellness-lavender-dark">
              <div className="p-2 rounded-lg bg-wellness-lavender/20">
                <Clock className="h-5 w-5" />
              </div>
              Pending Tasks ({pendingTasks.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 min-h-[300px]">
            {pendingTasks.length > 0 ? (
              pendingTasks.map((task) => (
                <div
                  key={task.id}
                  className="flex items-center gap-3 p-4 rounded-xl hover:bg-wellness-lavender/10 transition-all hover:scale-[1.01] border border-transparent hover:border-wellness-lavender/30"
                >
                  <Checkbox
                    checked={task.completed}
                    onCheckedChange={() => handleTaskToggle(task.id)}
                    className="data-[state=checked]:bg-wellness-lavender data-[state=checked]:border-wellness-lavender"
                  />
                  <span className="flex-1 text-wellness-lavender-dark font-medium">
                    {task.name}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDeleteTask(task.id)}
                    className="text-red-500 hover:text-red-700 hover:bg-red-50 transition-colors"
                  >
                    Delete
                  </Button>
                </div>
              ))
            ) : (
              <div className="text-center py-12 space-y-4">
                <CheckCircle className="h-16 w-16 text-wellness-lavender/50 mx-auto" />
                <div className="space-y-2">
                  <h3 className="text-lg font-medium text-wellness-lavender-dark">
                    All tasks completed! 🎉
                  </h3>
                  <p className="text-wellness-sage-dark/70">
                    You're having a productive day!
                  </p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Completed Tasks */}
        <Card className="glass-morphism border-wellness-peach/30 hover:shadow-xl transition-all duration-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-wellness-peach-dark">
              <div className="p-2 rounded-lg bg-wellness-peach/20">
                <Sparkles className="h-5 w-5" />
              </div>
              Completed Tasks ({completedTasks.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 min-h-[300px]">
            {completedTasks.length > 0 ? (
              completedTasks.map((task) => (
                <div
                  key={task.id}
                  className="flex items-center gap-3 p-4 rounded-xl bg-wellness-peach/10 border border-wellness-peach/20 opacity-90"
                >
                  <Checkbox
                    checked={task.completed}
                    onCheckedChange={() => handleTaskToggle(task.id)}
                    className="data-[state=checked]:bg-wellness-peach data-[state=checked]:border-wellness-peach"
                  />
                  <span className="flex-1 line-through text-wellness-peach-dark/70 font-medium">
                    {task.name}
                  </span>
                  <Badge className="bg-wellness-peach/20 text-wellness-peach-dark border-wellness-peach/30">
                    ✓ Done
                  </Badge>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDeleteTask(task.id)}
                    className="text-red-500 hover:text-red-700 hover:bg-red-50 transition-colors"
                  >
                    Delete
                  </Button>
                </div>
              ))
            ) : (
              <div className="text-center py-12 space-y-4">
                <List className="h-16 w-16 text-wellness-peach/50 mx-auto" />
                <div className="space-y-2">
                  <h3 className="text-lg font-medium text-wellness-peach-dark">
                    No completed tasks yet
                  </h3>
                  <p className="text-wellness-sage-dark/70">
                    Start checking off those tasks! 💪
                  </p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Dialogs */}
      <CreateTaskDialog
        isOpen={isTaskDialogOpen}
        onClose={() => {
          setIsTaskDialogOpen(false);
          setEditingTask(null);
        }}
        onSave={handleSaveTask}
        editingTask={editingTask}
      />

      <CreateRoutineDialog
        isOpen={isRoutineDialogOpen}
        onClose={() => {
          setIsRoutineDialogOpen(false);
          setEditingRoutine(null);
        }}
        onSave={handleSaveRoutine}
        editingRoutine={editingRoutine}
      />
    </div>
  );
};

export default Planning;
