export type TaskProps = {
  name: string;
  finished: boolean;
  working?: boolean;
};

export type TasksContextProps = {
  tasks: TaskProps[];
  addNewTask: (newTasks: TaskProps) => void;
  updateTask: (updateTask: TaskProps, newTask: TaskProps) => void;
  deleteTask: (deleteTask?: TaskProps, deleteFinishedTasks?: boolean) => void;
  setFinished: (
    check: boolean,
    task?: TaskProps,
    setAllTasksFinished?: boolean,
  ) => void;
  setWorkingTask: (task: TaskProps, working: boolean) => void;
};
