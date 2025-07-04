
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft, Plus, List, Calendar } from "lucide-react";
import { useLocalStorage } from "@/hooks/useLocalStorage";

const Planning = () => {
  const navigate = useNavigate();
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

  return (
    <div className="max-w-4xl mx-auto space-y-6 p-4">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          onClick={() => navigate('/')}
          className="hover:bg-wellness-sage/20"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Dashboard
        </Button>
        <div>
          <h1 className="text-3xl font-poppins font-bold text-wellness-sage-dark">
            Task Planning
          </h1>
          <p className="text-wellness-sage-dark/70">
            Organize your day with mindful planning
          </p>
        </div>
      </div>

      {/* Add New Task */}
      <Card className="glass-morphism border-wellness-sage/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-wellness-sage-dark">
            <Plus className="h-5 w-5" />
            Add New Task
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <Input
              placeholder="What would you like to accomplish?"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAddTask()}
              className="border-wellness-sage/20"
            />
            <Button 
              onClick={handleAddTask}
              className="bg-wellness-sage hover:bg-wellness-sage-dark text-white"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Tasks Lists */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pending Tasks */}
        <Card className="glass-morphism border-wellness-sky/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-wellness-sky-dark">
              <List className="h-5 w-5" />
              Pending Tasks ({pendingTasks.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {pendingTasks.length > 0 ? (
              pendingTasks.map((task) => (
                <div
                  key={task.id}
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-wellness-sky/10 transition-all"
                >
                  <Checkbox
                    checked={task.completed}
                    onCheckedChange={() => handleTaskToggle(task.id)}
                  />
                  <span className="flex-1 text-wellness-sky-dark">
                    {task.name}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDeleteTask(task.id)}
                    className="text-red-500 hover:text-red-700 hover:bg-red-50"
                  >
                    Delete
                  </Button>
                </div>
              ))
            ) : (
              <p className="text-wellness-sky-dark/50 text-center py-8">
                All tasks completed! 🎉
              </p>
            )}
          </CardContent>
        </Card>

        {/* Completed Tasks */}
        <Card className="glass-morphism border-wellness-lavender/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-wellness-lavender-dark">
              <Calendar className="h-5 w-5" />
              Completed Tasks ({completedTasks.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {completedTasks.length > 0 ? (
              completedTasks.map((task) => (
                <div
                  key={task.id}
                  className="flex items-center gap-3 p-3 rounded-lg bg-wellness-lavender/10 opacity-75"
                >
                  <Checkbox
                    checked={task.completed}
                    onCheckedChange={() => handleTaskToggle(task.id)}
                  />
                  <span className="flex-1 line-through text-wellness-lavender-dark/60">
                    {task.name}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDeleteTask(task.id)}
                    className="text-red-500 hover:text-red-700 hover:bg-red-50"
                  >
                    Delete
                  </Button>
                </div>
              ))
            ) : (
              <p className="text-wellness-lavender-dark/50 text-center py-8">
                No completed tasks yet
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Planning;
