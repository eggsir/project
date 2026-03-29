import React, { createContext, useContext, useMemo, useState } from "react";

export type Priority = "low" | "medium" | "high";
const DEFAULT_MOTIVATION = "ARHHHHHH";

export type Task = {
  id: number;
  text: string;
  completed: boolean;
  priority: Priority;
};

type TaskContextValue = {
  tasks: Task[];
  motivationText: string;
  setMotivationText: (value: string) => void;
  addTask: (text: string) => void;
  toggleTask: (id: number) => void;
  updateTaskText: (id: number, text: string) => void;
  setTaskPriority: (id: number, priority: Priority) => void;
  deleteTask: (id: number) => void;
  clearAllTasks: () => void;
};

const TaskContext = createContext<TaskContextValue | null>(null);

export function TaskProvider({ children }: { children: React.ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, text: "Review math notes", completed: true, priority: "medium" },
    { id: 2, text: "Finish science worksheet", completed: false, priority: "high" },
  ]);
  const [motivationText, setMotivationText] = useState(DEFAULT_MOTIVATION);

  const value = useMemo<TaskContextValue>(
    () => ({
      tasks,
      motivationText,
      setMotivationText,
      addTask: (text: string) => {
        const trimmed = text.trim();
        if (!trimmed) return;
        setTasks((prev) => [...prev, { id: Date.now(), text: trimmed, completed: false, priority: "low" }]);
      },
      toggleTask: (id: number) => {
        setTasks((prev) =>
          prev.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task))
        );
      },
      updateTaskText: (id: number, text: string) => {
        const trimmed = text.trim();
        if (!trimmed) return;
        setTasks((prev) => prev.map((task) => (task.id === id ? { ...task, text: trimmed } : task)));
      },
      setTaskPriority: (id: number, priority: Priority) => {
        setTasks((prev) => prev.map((task) => (task.id === id ? { ...task, priority } : task)));
      },
      deleteTask: (id: number) => {
        setTasks((prev) => prev.filter((task) => task.id !== id));
      },
      clearAllTasks: () => setTasks([]),
    }),
    [tasks, motivationText]
  );

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
}

export function useTasks() {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTasks must be used within a TaskProvider");
  }
  return context;
}
