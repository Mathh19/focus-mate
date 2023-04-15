import { createContext, useEffect, useState } from 'react';
import { TasksProps } from './types';

export const TasksContext = createContext({} as TasksProps);

const initialValues = () => {
  const tasksStorage = localStorage.getItem('tasks');
  if (tasksStorage === null) {
    return [];
  }
  return JSON.parse(tasksStorage);
};

export const TasksProvider = ({ children }: { children: React.ReactNode }) => {
  const [tasks, setTasks] = useState<string[]>(initialValues);

  const addNewTasks = (newTask: string) => {
    setTasks([...tasks, newTask]);
  };

  const updateTask = (updateTask: string, newTask: string) => {
    const updatedTasks = tasks.map((task) => {
      if (task === updateTask) {
        return (task = newTask);
      } else {
        return task;
      }
    });
    setTasks(updatedTasks);
  };

  const deleteTask = (deleteTask: string) => {
    setTasks(tasks.filter((task) => task !== deleteTask));
  };

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  return (
    <TasksContext.Provider
      value={{ tasks, setTasks: addNewTasks, updateTask, deleteTask }}
    >
      {children}
    </TasksContext.Provider>
  );
};
