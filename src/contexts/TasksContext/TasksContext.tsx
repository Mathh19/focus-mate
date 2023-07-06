import React, { createContext, useEffect, useContext, useReducer } from 'react';
import { TasksContextProps } from './types';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { PomodoroContext } from '../PomodoroContext/PomodoroContext';
import { TaskProps } from '../../shared-types/tasks';
import { getCurrentDayOfWeek } from '../../utils/getCurrentDayOfWeek';

export const TasksContext = createContext({} as TasksContextProps);

type ActionProps =
  | { type: 'add'; newTask: TaskProps }
  | { type: 'update'; updateTask: TaskProps; newTask: TaskProps }
  | { type: 'deleteTask'; deleteTask: TaskProps }
  | { type: 'deleteAllTask'; routineMode: boolean }
  | { type: 'deleteAllFinishedTasks'; routineMode: boolean }
  | { type: 'doneTask'; taskCheck: TaskProps; check: boolean }
  | { type: 'doneAllTasks'; routineMode: boolean }
  | { type: 'setFocusTask'; taskCheck: TaskProps };

const currentDay = getCurrentDayOfWeek();

const tasksReducer = (state: TaskProps[], action: ActionProps) => {
  switch (action.type) {
    case 'add':
      return [...state, { ...action.newTask }];

    case 'update':
      return state.map((task) =>
        task === action.updateTask ? { ...task, ...action.newTask } : task,
      );
    case 'deleteTask':
      return state.filter((task) => task !== action.deleteTask);
    case 'deleteAllTask':
      return action.routineMode
        ? state.filter((task) => task.day !== currentDay)
        : state.filter((task) => task.day !== undefined);
    case 'deleteAllFinishedTasks':
      return action.routineMode
        ? state.filter((task) => task.day !== currentDay || !task.finished)
        : state.filter((task) => task.day !== undefined || !task.finished);
    case 'doneTask':
      return state.map((task) =>
        task === action.taskCheck ? { ...task, finished: action.check } : task,
      );
    case 'doneAllTasks':
      return action.routineMode
        ? state.map((task) =>
            task.day !== undefined && task.day === currentDay
              ? { ...task, finished: true }
              : task,
          )
        : state.map((task) =>
            task.day === undefined ? { ...task, finished: true } : task,
          );
    case 'setFocusTask':
      return state.map((task) =>
        task === action.taskCheck
          ? { ...task, inFocus: true }
          : { ...task, inFocus: false },
      );
    default:
      return state;
  }
};

export const TasksProvider = ({ children }: { children: React.ReactNode }) => {
  const { configPomodoro } = useContext(PomodoroContext);

  const { storedValue: storedTasksValue, setValue: setValueTasks } =
    useLocalStorage<TaskProps[]>('tasks', []);
  const [state, dispatch] = useReducer(tasksReducer, storedTasksValue);

  const addNewTask = (newTask: TaskProps) => {
    dispatch({ type: 'add', newTask: newTask });
  };

  const updateTask = (updateTask: TaskProps, newTask: TaskProps) => {
    dispatch({ type: 'update', updateTask: updateTask, newTask: newTask });
  };

  const deleteTask = (deleteTask: TaskProps) => {
    dispatch({ type: 'deleteTask', deleteTask: deleteTask });
  };

  const deleteAllTasks = () => {
    dispatch({
      type: 'deleteAllTask',
      routineMode: configPomodoro.routineMode,
    });
  };

  const deleteAllFinishedTasks = () => {
    dispatch({
      type: 'deleteAllFinishedTasks',
      routineMode: configPomodoro.routineMode,
    });
  };

  const doneTask = (check: boolean, taskCheck: TaskProps) => {
    dispatch({ type: 'doneTask', taskCheck: taskCheck, check: check });
  };

  const doneAllTasks = () => {
    dispatch({ type: 'doneAllTasks', routineMode: configPomodoro.routineMode });
  };

  const setFocusTask = (taskCheck: TaskProps) => {
    dispatch({ type: 'setFocusTask', taskCheck: taskCheck });
  };

  useEffect(() => {
    setValueTasks(state);
  }, [setValueTasks, state]);

  return (
    <TasksContext.Provider
      value={{
        tasks: state,
        addNewTask,
        updateTask,
        deleteTask,
        deleteAllTasks,
        deleteAllFinishedTasks,
        doneTask,
        doneAllTasks,
        setFocusTask,
      }}
    >
      {children}
    </TasksContext.Provider>
  );
};
