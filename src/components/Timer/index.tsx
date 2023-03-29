import {
  CircularProgressbarWithChildren,
  buildStyles,
} from 'react-circular-progressbar';
import { times, TimeProps } from '../../times';
import { secondsToMinutes } from '../../utils/seconds-to-minutes';
import { TimerProps } from './Timer.types';

export const Timer = ({ timer, label, working }: TimerProps) => {
  const controlerTime = times[label as keyof TimeProps];
  const timerPercentage = (timer / controlerTime) * 100;

  return (
    <CircularProgressbarWithChildren
      strokeWidth={3}
      value={timerPercentage}
      styles={buildStyles({
        trailColor: '#31354c',
        pathColor: '#7564e2',
      })}
      className="relative z-10 h-80 w-80"
    >
      <div className="flex h-full w-full flex-col items-center justify-center rounded-full">
        <span className="font-sans text-8xl font-semibold">
          {secondsToMinutes(timer)}
        </span>
        <p className="mt-8 font-semibold">
          {working ? 'Time to work' : 'Break to rest'}
        </p>
      </div>
    </CircularProgressbarWithChildren>
  );
};
