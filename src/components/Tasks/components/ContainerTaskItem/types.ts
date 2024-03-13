import { TaskProps } from '../../../../shared-types/tasks';

export type ContainerTaskItemProps = {
  tasks: TaskProps[];
  shadowEffectColor: 'bg-skin-background' | 'skin-modal-bakcground';
  dynamicHeight: boolean;
};
