import { useContext } from 'react';
import {
  CircularProgressbarWithChildren,
  buildStyles,
} from 'react-circular-progressbar';
import { PomodoroContext } from '../../contexts/PomodoroContext/PomodoroContext';
import { TimerProps } from '../../timer';
import { secondsToMinutes } from '../../utils/secondsToMinutes';
import { TimerComponentProps } from './types';
import { Settings } from '../Settings';
import { TasksContext } from '../../contexts/TasksContext/TasksContext';

export const Timer = ({ timer, label }: TimerComponentProps) => {
  const { timer: timerContext } = useContext(PomodoroContext);
  const { tasks } = useContext(TasksContext);
  const controlerTimer = timerContext[label as keyof TimerProps];
  const timerPercentage = (timer / controlerTimer) * 100;

  return (
    <div className="w-full max-w-[384px]">
      <CircularProgressbarWithChildren
        strokeWidth={4}
        background
        backgroundPadding={3}
        value={timerPercentage}
        styles={buildStyles({
          backgroundColor: '#212034',
          pathColor: '#7564e2',
          strokeLinecap: 'round',
        })}
        className="h-full w-full drop-shadow-lg"
      >
        <div className="flex h-[90%] w-[90%] flex-col items-center justify-center gap-2 rounded-full border-[2px] border-bluishPurple shadow-shadowAllSides shadow-bluishPurple">
          <span className="font-sans text-8xl font-semibold max-[400px]:text-7xl">
            {secondsToMinutes(timer)}
          </span>
          <p className="font-semibold">
            {label === 'pomodoroTime' ? 'Time to work' : 'Break to rest'}
          </p>
          <Settings />
          {tasks.map(
            (task, index) =>
              task.working && (
                <p
                  key={index}
                  className="max-w-[240px] truncate font-semibold
                max-[540px]:max-w-[160px]"
                >
                  <span className="font-bold">Focused:</span> #{index + 1}{' '}
                  {task.name}
                </p>
              ),
          )}
        </div>
      </CircularProgressbarWithChildren>
    </div>
  );
};
