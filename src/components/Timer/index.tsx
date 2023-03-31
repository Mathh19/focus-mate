import { useContext } from 'react';
import {
  CircularProgressbarWithChildren,
  buildStyles,
} from 'react-circular-progressbar';
import { TimerContext } from '../../contexts/TimerContext';
import { TimeProps } from '../../times';
import { secondsToMinutes } from '../../utils/secondsToMinutes';
import { TimerProps } from './Timer.types';

export const Timer = ({ timer, label }: TimerProps) => {
  const { timer: times } = useContext(TimerContext);
  const controlerTimer = times[label as keyof TimeProps];
  const timerPercentage = (timer / controlerTimer) * 100;

  return (
    <CircularProgressbarWithChildren
      strokeWidth={3}
      value={timerPercentage}
      styles={buildStyles({
        trailColor: '#31354c',
        pathColor: '#7564e2',
      })}
      className="max-[370px]:h-72 max-[370px]:w-72 relative z-10 h-96 w-96 max-md:h-80 max-md:w-80"
    >
      <div className="z-10 flex h-full w-full flex-col items-center justify-center rounded-full">
        <span className="font-sans text-8xl font-semibold max-md:text-7xl">
          {secondsToMinutes(timer)}
        </span>
        <p className="mt-8 font-semibold">
          {label === 'pomodoroTime' ? 'Time to work' : 'Break to rest'}
        </p>
      </div>
    </CircularProgressbarWithChildren>
  );
};
