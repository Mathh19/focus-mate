import { useContext } from 'react';
import {
  CircularProgressbarWithChildren,
  buildStyles,
} from 'react-circular-progressbar';
import { PomodoroContext } from '../../contexts/PomodoroContext/PomodoroContext';
import { TimerProps } from '../../times';
import { secondsToMinutes } from '../../utils/secondsToMinutes';
import { TimerComponentProps } from './types';
import { SettingsTimer } from '../SettingsTimer';

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
      className="w-h-96 h-96 drop-shadow-lg max-[540px]:h-80 max-[540px]:w-80"
    >
      <div className="flex h-full w-full flex-col items-center justify-center gap-2 rounded-full">
        <span className="font-sans text-8xl font-semibold max-[540px]:text-7xl">
          {secondsToMinutes(timer)}
        </span>
        <p className="font-semibold">
          {label === 'pomodoroTime' ? 'Time to work' : 'Break to rest'}
        </p>
        <SettingsTimer />
      </div>
    </CircularProgressbarWithChildren>
  );
};
