import { secondsToMinutes } from '../../utils/seconds-to-minutes';
import { TimerProps } from './Timer.types';

export const Timer = ({ timer, working }: TimerProps) => {
  return (
    <div className="flex h-80 w-80 flex-col items-center justify-center rounded-full border-8 border-darkGrayColor">
      <span className="font-sans text-8xl font-semibold">
        {secondsToMinutes(timer)}
      </span>
      <p className="mt-8 font-semibold">
        {working ? 'Time to work' : 'Break to rest'}
      </p>
    </div>
  );
};
