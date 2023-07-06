import { useContext } from 'react';
import { TasksContext } from '../../contexts/TasksContext/TasksContext';
import { AnimatedCheckProps } from './types';

export const AnimatedCheck = ({ task }: AnimatedCheckProps) => {
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
      className={`relative h-6 w-6 cursor-pointer rounded-full border-[2px] ${
        !task.finished ? 'border-white' : 'border-successColor'
      }`}
    >
      {task.finished && (
        <>
          <span className="check bottom-[6px] right-[9px] w-[10px] rotate-45 animate-check-short-line"></span>
          <span className="check bottom-[10px] left-[5px] w-[22px] -rotate-45 animate-check-long-line"></span>
        </>
      )}
    </div>
  );
};
