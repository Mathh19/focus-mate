import { useContext } from 'react';
import {
  CircularProgressbarWithChildren,
  buildStyles,
} from 'react-circular-progressbar';
import { PomodoroContext } from '../../contexts/PomodoroContext';
import { TimerProps } from '../../times';
import { secondsToMinutes } from '../../utils/secondsToMinutes';
import { TimerComponentProps } from './Timer.types';
import { Modal } from '../Modal';

export const Timer = ({ timer, label }: TimerComponentProps) => {
  const { timer: timerContext } = useContext(PomodoroContext);
  const controlerTimer = timerContext[label as keyof TimerProps];
  const timerPercentage = (timer / controlerTimer) * 100;

  return (
    <CircularProgressbarWithChildren
      strokeWidth={3}
      background
      backgroundPadding={3}
      value={timerPercentage}
      styles={buildStyles({
        backgroundColor: '#212034',
        pathColor: '#7564e2',
      })}
      className="h-96 w-96 drop-shadow-lg max-md:h-80 max-md:w-80 max-[370px]:h-72 max-[370px]:w-72"
    >
      <div className="flex h-full w-full flex-col items-center justify-center gap-2 rounded-full">
        <span className="font-sans text-8xl font-semibold max-md:text-7xl max-[370px]:text-6xl">
          {secondsToMinutes(timer)}
        </span>
        <p className="mb-6 font-semibold">
          {label === 'pomodoroTime' ? 'Time to work' : 'Break to rest'}
        </p>
        <Modal />
      </div>
    </CircularProgressbarWithChildren>
  );
};
