import { TaskProps } from '../../contexts/TasksContext/types';

export type TaskInputProps = {
  newTask: TaskProps;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: () => void;
};
