import { TaskProps } from '../../shared-types/tasks';

export type TasksContextProps = {
  tasks: TaskProps[];
  addNewTask: (newTask: TaskProps) => void;
  updateTask: (updateTask: TaskProps, newTask: TaskProps) => void;
  deleteTask: (deleteTask: TaskProps) => void;
  deleteAllTasks: () => void;
  deleteAllFinishedTasks: () => void;
  doneTask: (check: boolean, taskCheck: TaskProps) => void;
  doneAllTasks: () => void;
  setFocusTask: (task: TaskProps) => void;
};
