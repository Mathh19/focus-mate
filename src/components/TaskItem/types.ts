import { TaskProps } from '../../contexts/TasksContext/types';

export type TaskItemProps = {
  task: TaskProps;
  handleWorking: (task: TaskProps) => void;
};
