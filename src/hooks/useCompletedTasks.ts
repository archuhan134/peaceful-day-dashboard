
import { useState, useEffect } from 'react';

export interface CompletedTask {
  id: string;
  name: string;
  completionTime: string;
  date: string;
  type: 'planning' | 'routine' | 'habit';
}

export function useCompletedTasks() {
  const [completedTasks, setCompletedTasks] = useState<CompletedTask[]>(() => {
    try {
      return JSON.parse(localStorage.getItem("completedTasks") || "[]");
    } catch {
      return [];
    }
  });

  const addCompletedTask = (taskName: string, type: 'planning' | 'routine' | 'habit') => {
    const now = new Date();
    const newTask: CompletedTask = {
      id: Date.now().toString(),
      name: taskName,
      completionTime: now.toLocaleTimeString('en-US', { 
        hour: 'numeric', 
        minute: '2-digit',
        hour12: true 
      }),
      date: now.toLocaleDateString('en-GB', { 
        day: '2-digit', 
        month: 'short', 
        year: 'numeric' 
      }),
      type
    };

    const updatedTasks = [newTask, ...completedTasks].slice(0, 50); // Keep only last 50 tasks
    setCompletedTasks(updatedTasks);
    localStorage.setItem("completedTasks", JSON.stringify(updatedTasks));
  };

  const getTasksCount = () => completedTasks.length;

  return {
    completedTasks,
    addCompletedTask,
    getTasksCount
  };
}
