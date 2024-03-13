import { useContext } from 'react';
import { TasksContext } from '../../../contexts/TasksContext/TasksContext';
import { AnimatedCheckProps } from './types';

export const Checkmark = ({ task }: AnimatedCheckProps) => {
  const { doneTask } = useContext(TasksContext);

  const handleCheck = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    doneTask(!task.finished, task);
  };

  return (
    <div
      role="button"
      onClick={handleCheck}
      aria-label="A button to check your task"
      className={`relative inline-block w-6 cursor-pointer rounded-full border-[2px] ${
        !task.finished ? 'border-white' : 'border-green-400'
      }`}
    >
      <div
        className={`${task.finished ? 'block' : 'hidden'} ${
          task.finished && 'after:animate-checkmark'
        } after:absolute after:left-[4px] after:top-[10px] after:h-5 after:w-2 after:origin-top-left after:rotate-[225deg] after:-scale-x-100 after:border-r-2 after:border-t-2 after:border-green-400 after:content-['']`}
      ></div>
    </div>
  );
};
