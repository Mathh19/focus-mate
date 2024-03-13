import { useContext } from 'react';
import { TasksContext } from '../../../../contexts/TasksContext/TasksContext';
import { Checkmark } from '../../../UI/Checkmark';
import { ConfigTasks } from '../ConfigTasks';
import { TaskItemProps } from './types';
import { TaskProps } from '../../../../shared-types/tasks';

export const TaskItem = ({ task }: TaskItemProps) => {
  const { setFocusTask } = useContext(TasksContext);

  const handleWorking = (task: TaskProps) => {
    setFocusTask(task);
  };

  return (
    <li
      onClick={() => handleWorking(task)}
      className="flex items-center justify-between gap-1 rounded-md bg-skin-base px-3 py-2 text-2xl font-semibold transition-colors hover:bg-skin-dark"
      aria-label={task.name}
      title={task.name}
    >
      <p className={`truncate ${task.finished && 'line-through'}`}>
        {task.name}
      </p>
      <div className="flex gap-2">
        <Checkmark task={task} />
        <ConfigTasks task={task} />
      </div>
    </li>
  );
};
