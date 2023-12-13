import React, { createContext } from 'react';
import { TasksContextProps } from './types';
import { useTasks } from '../../hooks/useTasks';

export const TasksContext = createContext({} as TasksContextProps);

export const TasksProvider = ({ children }: { children: React.ReactNode }) => {
  const {
    tasks,
    doneActions,
    deleteActions,
    addNewTask,
    updateTask,
    setFocusTask,
  } = useTasks();

  return (
    <TasksContext.Provider
      value={{
        tasks: tasks,
        addNewTask,
        updateTask,
        deleteTask: deleteActions.deleteTask,
        deleteAllTasks: deleteActions.deleteAllTasks,
        deleteAllFinishedTasks: deleteActions.deleteAllFinishedTasks,
        doneTask: doneActions.doneTask,
        doneAllTasks: doneActions.doneAllTasks,
        setFocusTask,
      }}
    >
      {children}
    </TasksContext.Provider>
  );
};
