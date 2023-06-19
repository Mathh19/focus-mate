import React, { createContext, useState, useEffect, useContext } from 'react';
import { TasksContextProps } from './types';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { initialWeeklyTasks } from '../../defaultConfig/tasks';
import { taskInFocus } from '../../utils/taskInFocus';
import { PomodoroContext } from '../PomodoroContext/PomodoroContext';
import { getDayIndex } from '../../utils/getDayIndex';
import { getCurrentDayOfWeek } from '../../utils/getCurrentDayOfWeek';
import { TaskProps, WeeklyTasksProps } from '../../shared-types/tasks';

export const TasksContext = createContext({} as TasksContextProps);

export const TasksProvider = ({ children }: { children: React.ReactNode }) => {
  const { configPomodoro } = useContext(PomodoroContext);

  const { storedValue: storedTasksValue, setValue: setValueTasks } =
    useLocalStorage<TaskProps[]>('tasks', []);
  const { storedValue: storedWeeklyTasksValue, setValue: setValueWeeklyTasks } =
    useLocalStorage<WeeklyTasksProps[]>('weeklyTasks', initialWeeklyTasks);

  const currentDay = getCurrentDayOfWeek();
  const targetDayIndex = getDayIndex(currentDay, storedWeeklyTasksValue);

  const [tasks, setTasks] = useState<TaskProps[]>(storedTasksValue);
  const [weeklyTasks, setWeeklyTasks] = useState<WeeklyTasksProps[]>(
    storedWeeklyTasksValue,
  );

  const addNewTask = (newTask: TaskProps) => {
    configPomodoro.weeklyTasksMode
      ? setValueWeeklyTasks((prevWeeklyTasks) => {
          if (targetDayIndex !== -1) {
            prevWeeklyTasks[targetDayIndex].tasks.push(newTask);
          }
          return prevWeeklyTasks;
        })
      : setTasks((prevTasks) => [...prevTasks, { ...newTask }]);
  };

  const addWeeklyTasks = (newWeeklyTasks: WeeklyTasksProps[]) => {
    setWeeklyTasks((prevWeeklyTasks) => {
      return prevWeeklyTasks.map((week) => {
        const updatedWeeklyTasks = newWeeklyTasks.find(
          (newWeek) => newWeek.day === week.day,
        );
        if (updatedWeeklyTasks) {
          return { ...week, tasks: updatedWeeklyTasks.tasks };
        }
        return week;
      });
    });
  };

  const updateTask = (updateTask: TaskProps, newTask: TaskProps) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task === updateTask ? { ...task, ...newTask } : task,
      ),
    );

    setWeeklyTasks((prevWeeklyTasks) => {
      if (targetDayIndex !== -1) {
        const updatedTasks = [...prevWeeklyTasks];
        updatedTasks[targetDayIndex].tasks = updatedTasks[
          targetDayIndex
        ].tasks.map((task) =>
          task === updateTask ? { ...task, ...newTask } : task,
        );
        return updatedTasks;
      }
      return prevWeeklyTasks;
    });
  };

  const deleteTask = (
    deleteTask?: TaskProps,
    deleteFinishedTasks?: boolean,
  ) => {
    if (deleteTask) {
      setTasks((prevTasks) => prevTasks.filter((task) => task !== deleteTask));

      setWeeklyTasks((prevWeeklyTasks) => {
        if (targetDayIndex !== -1) {
          const updatedTasks = [...prevWeeklyTasks];
          updatedTasks.map(
            (tasks) =>
              (tasks.tasks = tasks.tasks.filter((task) => task !== deleteTask)),
          );
          return updatedTasks;
        }
        return prevWeeklyTasks;
      });
      return;
    } else if (deleteFinishedTasks) {
      configPomodoro.weeklyTasksMode
        ? setWeeklyTasks((prevWeeklyTasks) => {
            if (targetDayIndex !== -1) {
              const updatedTasks = [...prevWeeklyTasks];
              updatedTasks[targetDayIndex].tasks = updatedTasks[
                targetDayIndex
              ].tasks.filter((task) => !task.finished);
              return updatedTasks;
            }
            return prevWeeklyTasks;
          })
        : setTasks((prevTasks) => prevTasks.filter((task) => !task.finished));
      return;
    }

    if (configPomodoro.weeklyTasksMode) {
      setWeeklyTasks((prevWeeklyTasks) => {
        if (targetDayIndex !== -1) {
          const updatedTasks = [...prevWeeklyTasks];
          updatedTasks[targetDayIndex].tasks = [];
          return updatedTasks;
        }
        return prevWeeklyTasks;
      });
      return;
    }

    setTasks([]);
  };

  const setFinished = (check: boolean, taskCheck?: TaskProps) => {
    if (taskCheck) {
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task === taskCheck ? { ...task, finished: check } : task,
        ),
      );
      setWeeklyTasks((prevWeeklyTasks) => {
        if (targetDayIndex !== -1) {
          const finishedTasks = [...prevWeeklyTasks];

          finishedTasks.map(
            (tasks) =>
              (tasks.tasks = tasks.tasks.map((task) =>
                task === taskCheck ? { ...task, finished: check } : task,
              )),
          );
          return finishedTasks;
        }
        return prevWeeklyTasks;
      });
      return;
    }
    if (configPomodoro.weeklyTasksMode) {
      setWeeklyTasks((prevWeeklyTasks) => {
        if (targetDayIndex !== -1) {
          const finishedTasks = [...prevWeeklyTasks];

          finishedTasks[targetDayIndex].tasks = finishedTasks[
            targetDayIndex
          ].tasks.map((task) => ({
            ...task,
            finished: check,
          }));
          return finishedTasks;
        }
        return prevWeeklyTasks;
      });
      return;
    }
    setTasks((prevTasks) =>
      prevTasks.map((task) => ({ ...task, finished: check })),
    );
  };

  const setFocusTask = (taskCheck: TaskProps) => {
    const { focusedTask } = taskInFocus(tasks, taskCheck);
    const { focusedTask: focusedWeeklyTask } = taskInFocus(
      weeklyTasks[targetDayIndex]?.tasks ?? [],
      taskCheck,
    );

    setTasks(focusedTask);

    setWeeklyTasks((prevWeeklyTasks) => {
      if (targetDayIndex !== -1) {
        const updatedTasks = [...prevWeeklyTasks];
        updatedTasks[targetDayIndex].tasks = focusedWeeklyTask;
        return updatedTasks;
      }
      return prevWeeklyTasks;
    });
  };

  useEffect(() => {
    setValueTasks(tasks);
    setValueWeeklyTasks(weeklyTasks);
  }, [weeklyTasks, setValueWeeklyTasks, setValueTasks, tasks]);

  return (
    <TasksContext.Provider
      value={{
        tasks,
        weeklyTasks,
        addNewTask,
        addWeeklyTasks,
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
