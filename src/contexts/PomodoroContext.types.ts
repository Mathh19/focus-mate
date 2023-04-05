import { TimerProps } from '../times';

export type PomodoroContextProps = {
  timer: {
    pomodoroTime: number;
    shortRestTime: number;
    longRestTime: number;
    cycles: number;
  };
  setTimer: (newTimer: TimerProps) => void;
  configPomodoro?: {
    sound: {
      mute: boolean;
      volume: number;
    };
  };
};
