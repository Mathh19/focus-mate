import { TaskProps } from '../../shared-types/tasks';

export type ContainerTaskItemProps = {
  tasks: TaskProps[];
  shadowEffectColor: 'backgroundColor' | 'darkGray';
  dynamicHeight: boolean;
};
