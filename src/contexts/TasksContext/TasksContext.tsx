import { createContext, useState, useEffect } from 'react';
import { TaskProps, TasksContextProps } from './types';
import { useLocalStorage } from '../../hooks/useLocalStorage';

export const TasksContext = createContext({} as TasksContextProps);

export const TasksProvider = ({ children }: { children: React.ReactNode }) => {
  const { storedValue, setValue } = useLocalStorage<TaskProps[]>('tasks', []);
  const [tasks, setTasks] = useState<TaskProps[]>(storedValue);

  const addNewTask = (newTask: TaskProps) => {
    setTasks([...tasks, { ...newTask }]);
  };

  const updateTask = (updateTask: TaskProps, newTask: TaskProps) => {
    const updatedTasks = tasks.map((task) => {
      if (task === updateTask) {
        return { ...task, ...newTask };
      } else {
        return task;
      }
    });
    setTasks(updatedTasks);
  };

  const deleteTask = (
    deleteTask?: TaskProps,
    deleteFinishedTasks?: boolean,
  ) => {
    if (deleteTask) {
      return setTasks(tasks.filter((task) => task !== deleteTask));
    } else if (deleteFinishedTasks) {
      return setTasks(tasks.filter((task) => task.finished !== true));
    }
    setTasks([]);
  };

  const setFinished = (
    check: boolean,
    taskCheck?: TaskProps,
    setAllTasksFinished?: boolean,
  ) => {
    if (taskCheck) {
      const checkTask = tasks.map((task) => {
        if (task === taskCheck) {
          return { ...task, finished: check };
        } else {
          return task;
        }
      });
      return setTasks(checkTask);
    } else if (setAllTasksFinished) {
      const allFinishedTasks = tasks.map((task) => {
        if (task.finished === false) {
          return { ...task, finished: check };
        } else {
          return task;
        }
      });
      return setTasks(allFinishedTasks);
    }
    const checkAllTasks = tasks.map((task) => {
      return { ...task, finished: check };
    });
    setTasks(checkAllTasks);
  };

  const setWorkingTask = (taskCheck: TaskProps, working: boolean) => {
    const checkTask = tasks.map((task) => {
      if (task === taskCheck) {
        return { ...task, working: working };
      } else {
        return { ...task, working: false };
      }
    });
    setTasks(checkTask);
  };

  useEffect(() => {
    setValue(tasks);
  }, [setValue, tasks]);

  return (
    <TasksContext.Provider
      value={{
        tasks,
        addNewTask,
        updateTask,
        deleteTask,
        setFinished,
        setWorkingTask,
      }}
    >
      {children}
    </TasksContext.Provider>
  );
};
