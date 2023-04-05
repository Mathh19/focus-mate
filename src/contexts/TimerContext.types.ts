import { TimerProps } from '../times';

export type TimerContextProps = {
  timer: {
    pomodoroTime: number;
    shortRestTime: number;
    longRestTime: number;
    cycles: number;
  };
  setTimer: (newTimer: TimerProps) => void;
};
