import React, { createContext, useState, useEffect, useContext } from 'react';
import { TasksContextProps } from './types';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { taskInFocus } from '../../utils/taskInFocus';
import { PomodoroContext } from '../PomodoroContext/PomodoroContext';
import { TaskProps } from '../../shared-types/tasks';
import { getCurrentDayOfWeek } from '../../utils/getCurrentDayOfWeek';

export const TasksContext = createContext({} as TasksContextProps);

export const TasksProvider = ({ children }: { children: React.ReactNode }) => {
  const { configPomodoro } = useContext(PomodoroContext);

  const { storedValue: storedTasksValue, setValue: setValueTasks } =
    useLocalStorage<TaskProps[]>('tasks', []);
  const [tasks, setTasks] = useState<TaskProps[]>(storedTasksValue);

  const currentDay = getCurrentDayOfWeek();

  const addNewTask = (newTask: TaskProps) => {
    setTasks((prevTasks) => [...prevTasks, { ...newTask }]);
  };

  const updateTask = (updateTask: TaskProps, newTask: TaskProps) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task === updateTask ? { ...task, ...newTask } : task,
      ),
    );
  };

  const deleteTask = (
    deleteTask?: TaskProps,
    deleteFinishedTasks?: boolean,
  ) => {
    if (deleteTask) {
      setTasks((prevTasks) => prevTasks.filter((task) => task !== deleteTask));
      return;
    } else if (deleteFinishedTasks) {
      setTasks((prevTasks) => prevTasks.filter((task) => !task.finished));
      return;
    }
    configPomodoro.routineMode
      ? setTasks((prevTasks) => {
          const tasksFilter = prevTasks.filter(
            (task) => task.day !== currentDay,
          );
          return tasksFilter;
        })
      : setTasks((prevTasks) => {
          const tasksFilter = prevTasks.filter(
            (task) => task.day !== undefined,
          );
          return tasksFilter;
        });
  };

  const setFinished = (check: boolean, taskCheck?: TaskProps) => {
    if (taskCheck) {
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task === taskCheck ? { ...task, finished: check } : task,
        ),
      );
      return;
    }
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.day !== undefined && task.day === currentDay
          ? { ...task, finished: check }
          : task,
      ),
    );
  };

  const setFocusTask = (taskCheck: TaskProps) => {
    const { focusedTask } = taskInFocus(tasks, taskCheck);

    setTasks(focusedTask);
  };

  useEffect(() => {
    setValueTasks(tasks);
  }, [setValueTasks, tasks]);

  return (
    <TasksContext.Provider
      value={{
        tasks,
        addNewTask,
        updateTask,
        deleteTask,
        setFinished,
        setFocusTask,
      }}
    >
      {children}
    </TasksContext.Provider>
  );
};
