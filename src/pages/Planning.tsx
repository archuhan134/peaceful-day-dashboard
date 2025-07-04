
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Plus, List, Calendar, CheckCircle, Clock, Sparkles } from "lucide-react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import AppHeader from "@/components/AppHeader";

const Planning = () => {
  const [newTask, setNewTask] = useState('');
  
  const [tasks, setTasks] = useLocalStorage("tasks", [
    { id: "1", name: "Review weekly goals", completed: false },
    { id: "2", name: "Team meeting prep", completed: false },
    { id: "3", name: "Grocery shopping", completed: false },
    { id: "4", name: "Call family", completed: false }
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

  return (
    <div className="space-y-6">
      <AppHeader />

      {/* Progress Overview */}
      <Card className="glass-morphism border-wellness-sage/30 hover:shadow-xl transition-all duration-300">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-wellness-sage-dark">
            <div className="p-2 rounded-lg bg-wellness-sage/20">
              <Calendar className="h-5 w-5" />
            </div>
            Today's Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center space-y-2">
              <div className="text-3xl font-bold text-wellness-sky-dark">{tasks.length}</div>
              <p className="text-sm text-wellness-sage-dark/70">Total Tasks</p>
            </div>
            <div className="text-center space-y-2">
              <div className="text-3xl font-bold text-wellness-lavender-dark">{completedTasks.length}</div>
              <p className="text-sm text-wellness-sage-dark/70">Completed</p>
            </div>
            <div className="text-center space-y-2">
              <div className="text-3xl font-bold text-wellness-peach-dark">{completionRate}%</div>
              <p className="text-sm text-wellness-sage-dark/70">Progress</p>
            </div>
          </div>
          <div className="mt-6 space-y-2">
            <div className="w-full bg-wellness-sage/20 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-wellness-sage to-wellness-sage-dark h-3 rounded-full transition-all duration-700"
                style={{ width: `${completionRate}%` }}
              />
            </div>
            <p className="text-center text-sm text-wellness-sage-dark/70">
              {getMotivationalMessage()}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Add New Task */}
      <Card className="glass-morphism border-wellness-sky/30 hover:shadow-xl transition-all duration-300">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-wellness-sky-dark">
            <div className="p-2 rounded-lg bg-wellness-sky/20">
              <Plus className="h-5 w-5" />
            </div>
            Add New Task
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-3">
            <Input
              placeholder="What would you like to accomplish today?"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAddTask()}
              className="border-wellness-sky/30 focus:border-wellness-sky/50 transition-colors"
            />
            <Button 
              onClick={handleAddTask}
              className="bg-wellness-sky hover:bg-wellness-sky-dark text-white shadow-md hover:shadow-lg transition-all px-6"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Tasks Lists */}
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
    </div>
  );
};

export default Planning;
