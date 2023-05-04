import { TimerProps } from '../../timer';

export type ConfigPomodoroProps = {
  configPomodoro: {
    auto: boolean;
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
    auto: boolean;
    volume: number[];
  };
  setTimer: (newTimer: TimerProps) => void;
  setConfig: (newConfig: ConfigPomodoroProps) => void;
};
