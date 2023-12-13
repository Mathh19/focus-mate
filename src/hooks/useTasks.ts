import {
  useCallback,
  useContext,
  useEffect,
  useReducer,
  useState,
} from 'react';
import { TaskProps } from '../shared-types/tasks';
import { api } from '../services/api';
import { AuthContext } from '../contexts/AuthContext/AuthContext';
import { tasksReducer } from '../contexts/TasksContext/reduces/taskReducer';
import { useLocalStorage } from './useLocalStorage';
import {
  addTaskAPI,
  deleteFinishedRoutineTasksAPI,
  deleteFinishedTasksAPI,
  deleteRoutineTasksAPI,
  deleteTaskAPI,
  deleteTasksAPI,
  finishedRoutineTasksAPI,
  finishedTasksAPI,
  setFocusTaskAPI,
  updateTaskAPI,
} from '../services/tasks';
import { PomodoroContext } from '../contexts/PomodoroContext/PomodoroContext';
import { getCurrentDayOfWeek } from '../utils/getCurrentDayOfWeek';

const currentDay = getCurrentDayOfWeek();

export const useTasks = () => {
  const { signed } = useContext(AuthContext);
  const { configPomodoro } = useContext(PomodoroContext);
  const { storedValue: storedTasksValue, setValue: setStoredValueTasks } =
    useLocalStorage<TaskProps[]>('tasks', []);
  const [tasks, setTasks] = useState<TaskProps[]>([]);
  const [state, dispatch] = useReducer(tasksReducer, storedTasksValue);

  const addNewTask = useCallback(
    async (newTask: TaskProps) => {
      if (signed) {
        const newTaskAdded = await addTaskAPI(newTask);
        setTasks([...tasks, newTaskAdded]);
        return;
      }
      dispatch({ type: 'add_task', newTask: newTask });
    },
    [signed, tasks],
  );

  const updateTask = useCallback(
    (updateTask: TaskProps, newTask: TaskProps) => {
      if (signed) {
        setTasks((prevTasks) =>
          prevTasks.map((task) =>
            task._id === updateTask._id ? { ...task, ...newTask } : task,
          ),
        );
        updateTaskAPI(updateTask._id, newTask);
        return;
      }
      dispatch({
        type: 'update_task',
        updateTask: updateTask,
        newTask: newTask,
      });
    },
    [signed],
  );

  const deleteTask = useCallback(
    (deleteTask: TaskProps) => {
      if (signed) {
        setTasks(tasks.filter((task) => task._id !== deleteTask._id));
        deleteTaskAPI(deleteTask._id);
        return;
      }
      dispatch({ type: 'delete_task', deleteTask: deleteTask });
    },
    [signed, tasks],
  );

  const deleteAllTasks = useCallback(() => {
    if (signed) {
      if (configPomodoro.routineMode) {
        setTasks(tasks.filter((task) => task.day !== currentDay));
        deleteRoutineTasksAPI();
      } else {
        setTasks(tasks.filter((task) => task.day !== undefined));
        deleteTasksAPI();
      }
      return;
    }

    dispatch({
      type: 'delete_all_task',
      routineMode: configPomodoro.routineMode,
    });
  }, [configPomodoro.routineMode, signed, tasks]);

  const deleteAllFinishedTasks = useCallback(() => {
    if (signed) {
      if (configPomodoro.routineMode) {
        setTasks(
          tasks.filter((task) => task.day !== currentDay || !task.finished),
        );
        deleteFinishedRoutineTasksAPI();
      } else {
        setTasks(
          tasks.filter((task) => task.day !== undefined || !task.finished),
        );
        deleteFinishedTasksAPI();
      }
      return;
    }

    dispatch({
      type: 'delete_all_finished_tasks',
      routineMode: configPomodoro.routineMode,
    });
  }, [configPomodoro.routineMode, signed, tasks]);

  const doneTask = useCallback(
    (check: boolean, taskCheck: TaskProps) => {
      if (signed) {
        setTasks(
          tasks.map((task) =>
            task._id === taskCheck._id ? { ...task, finished: check } : task,
          ),
        );
        updateTaskAPI(taskCheck._id, { ...taskCheck, finished: check });
        return;
      }
      dispatch({ type: 'done_task', taskCheck: taskCheck, check: check });
    },
    [signed, tasks],
  );

  const doneAllTasks = useCallback(() => {
    if (signed) {
      if (configPomodoro.routineMode) {
        setTasks(
          tasks.map((task) =>
            task.day !== undefined && task.day === currentDay
              ? { ...task, finished: true }
              : task,
          ),
        );
        finishedRoutineTasksAPI();
      } else {
        setTasks(
          tasks.map((task) =>
            task.day === undefined ? { ...task, finished: true } : task,
          ),
        );
        finishedTasksAPI();
      }
      return;
    }
    dispatch({
      type: 'done_all_tasks',
      routineMode: configPomodoro.routineMode,
    });
  }, [configPomodoro.routineMode, signed, tasks]);

  const setFocusTask = useCallback(
    (taskCheck: TaskProps) => {
      if (signed) {
        setTasks(
          tasks.map((task) =>
            task._id === taskCheck._id
              ? { ...task, inFocus: true }
              : { ...task, inFocus: false },
          ),
        );
        setFocusTaskAPI(taskCheck._id);
        return;
      }
      dispatch({ type: 'set_focus_task', taskCheck: taskCheck });
    },
    [signed, tasks],
  );

  useEffect(() => {
    const fetchData = async () => {
      if (signed) {
        try {
          const response = await api.get('/task');
          setTasks(response.data);
        } catch (error) {
          console.log(error);
        }
      } else {
        setTasks(state);
      }
    };

    fetchData();
  }, [signed, state]);

  useEffect(() => {
    setStoredValueTasks(state);
  }, [setStoredValueTasks, state]);

  return {
    tasks,
    deleteActions: {
      deleteTask,
      deleteAllTasks,
      deleteAllFinishedTasks,
    },
    doneActions: {
      doneTask,
      doneAllTasks,
    },
    addNewTask,
    updateTask,
    setFocusTask,
  };
};
