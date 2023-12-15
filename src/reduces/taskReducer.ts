/* eslint-disable prettier/prettier */
import { TaskProps } from '../shared-types/tasks';
import { getCurrentDayOfWeek } from '../utils/getCurrentDayOfWeek';

const currentDay = getCurrentDayOfWeek();

type ActionProps =
  | { type: 'add_task'; newTask: TaskProps }
  | { type: 'update_task'; updateTask: TaskProps; newTask: TaskProps }
  | { type: 'delete_task'; deleteTask: TaskProps }
  | { type: 'delete_all_task'; routineMode: boolean }
  | { type: 'delete_all_finished_tasks'; routineMode: boolean }
  | { type: 'done_task'; taskCheck: TaskProps; check: boolean }
  | { type: 'done_all_tasks'; routineMode: boolean }
  | { type: 'set_focus_task'; taskCheck: TaskProps };

export const tasksReducer = (state: TaskProps[], action: ActionProps) => {
  switch (action.type) {
    case 'add_task':
      return [...state, { ...action.newTask }];

    case 'update_task':
      return state.map((task) =>
        task === action.updateTask ? { ...task, ...action.newTask } : task,
      );
    case 'delete_task':
      return state.filter((task) => task !== action.deleteTask);
    case 'delete_all_task':
      return action.routineMode
        ? state.filter((task) => task.day !== currentDay)
        : state.filter((task) => task.day !== undefined);
    case 'delete_all_finished_tasks':
      return action.routineMode
        ? state.filter((task) => task.day !== currentDay || !task.finished)
        : state.filter((task) => task.day !== undefined || !task.finished);
    case 'done_task':
      return state.map((task) =>
        task === action.taskCheck ? { ...task, finished: action.check } : task,
      );
    case 'done_all_tasks':
      return action.routineMode
        ? state.map((task) =>
            task.day !== undefined && task.day === currentDay
              ? { ...task, finished: true }
              : task,
          )
        : state.map((task) =>
            task.day === undefined ? { ...task, finished: true } : task,
          );
    case 'set_focus_task':
      return state.map((task) =>
        task === action.taskCheck
          ? { ...task, inFocus: true }
          : { ...task, inFocus: false },
      );
    default:
      return state;
  }
};
