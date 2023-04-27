import { TimerProps } from '../../timer';

export type ConfigPomodoroProps = {
  configPomodoro: {
    volume: number[];
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
    volume: number[];
  };
  setTimer: (newTimer: TimerProps) => void;
  setConfig: (newConfig: ConfigPomodoroProps) => void;
};
