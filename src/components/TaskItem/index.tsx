import { AnimatedCheck } from '../AnimatedCheck';
import { ConfigTasks } from '../ConfigTasks';
import { TaskItemProps } from './types';

export const TaskItem = ({ task, handleWorking }: TaskItemProps) => {
  return (
    <li
      onClick={() => handleWorking(task)}
      className="flex cursor-pointer items-center justify-between gap-1 rounded-md bg-bluishPurple px-3 py-2 transition-colors hover:bg-bluishPurple-dark blueTheme:bg-blueTheme blueTheme:hover:bg-blueTheme-dark dark:bg-darkTheme dark:hover:bg-darkTheme-dark"
      aria-label={task.name}
    >
      <p className={`truncate ${task.finished && 'line-through'}`}>
        {task.name}
      </p>
      <div className="flex gap-2">
        <AnimatedCheck task={task} />
        <ConfigTasks task={task} />
      </div>
    </li>
  );
};
