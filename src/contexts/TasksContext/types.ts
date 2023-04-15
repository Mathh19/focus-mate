export type TasksProps = {
  tasks: string[];
  setTasks: (newTasks: string) => void;
  updateTask: (updateTask: string, newTask: string) => void;
  deleteTask: (deleteTask: string) => void;
};
