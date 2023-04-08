import { TimerProps } from '../times';

export type ConfigPomodoroProps = {
  configPomodoro: {
    sound: {
      volume: number[];
    };
  };
};

export type PomodoroContextProps = {
  timer: {
    pomodoroTime: number;
    shortRestTime: number;
    longRestTime: number;
    cycles: number;
  };
  configPomodoro: {
    sound: {
      volume: number[];
    };
  };
  setTimer: (newTimer: TimerProps) => void;
  setConfig: (newConfig: ConfigPomodoroProps) => void;
};
