import { TaskProps } from '../../shared-types/tasks';

export type TasksContextProps = {
  tasks: TaskProps[];
  addNewTask: (newTask: TaskProps) => void;
  updateTask: (updateTask: TaskProps, newTask: TaskProps) => void;
  deleteTask: (deleteTask?: TaskProps, deleteFinishedTasks?: boolean) => void;
  setFinished: (
    check: boolean,
    task?: TaskProps,
    setAllTasksFinished?: boolean,
  ) => void;
  setFocusTask: (task: TaskProps) => void;
};
