import { TaskProps } from '../../../shared-types/tasks';

export type TaskInputProps = {
  newTask: TaskProps;
  disabled?: boolean;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: () => void;
};
