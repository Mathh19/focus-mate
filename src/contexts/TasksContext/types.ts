import { TaskProps, WeeklyTasksProps } from '../../shared-types/tasks';

export type TasksContextProps = {
  tasks: TaskProps[];
  weeklyTasks: WeeklyTasksProps[];
  addNewTask: (newTasks: TaskProps) => void;
  addWeeklyTasks: (newWeeklyTasks: WeeklyTasksProps[]) => void;
  updateTask: (updateTask: TaskProps, newTask: TaskProps) => void;
  deleteTask: (deleteTask?: TaskProps, deleteFinishedTasks?: boolean) => void;
  setFinished: (
    check: boolean,
    task?: TaskProps,
    setAllTasksFinished?: boolean,
  ) => void;
  setFocusTask: (task: TaskProps) => void;
};
