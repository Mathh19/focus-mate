import { TimerProps } from '../../timer';

export type ThemeProps = 'defaultTheme' | 'blueTheme' | 'darkTheme';

export type ConfigPomodoroProps = {
  auto: boolean;
  volume: number[];
  theme: ThemeProps;
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
    theme: ThemeProps;
  };
  setTimer: (newTimer: TimerProps) => void;
  setConfig: (newConfig: ConfigPomodoroProps) => void;
};
