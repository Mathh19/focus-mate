import { ConfigPomodoroProps } from '../contexts/PomodoroContext/types';

export type TimerProps = {
  pomodoroTime: number;
  shortRestTime: number;
  longRestTime: number;
  cycles: number;
};

const theme = 'defaultTheme';

export const defaultPomodoro = {
  timer: {
    pomodoroTime: 1500,
    shortRestTime: 300,
    longRestTime: 900,
    cycles: 4,
  } as TimerProps,
  config: {
    auto: true,
    volume: [100],
    theme: theme,
  } as ConfigPomodoroProps,
};
