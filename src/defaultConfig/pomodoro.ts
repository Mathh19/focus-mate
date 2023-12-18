import { PomodoroProps } from '../shared-types/pomodoro';

export const defaultPomodoro = {
  pomodoroTime: 1500,
  shortRestTime: 300,
  longRestTime: 900,
  cycles: 4,
  auto: true,
  volume: [100],
  theme: 'defaultTheme',
  notification: false,
  routineMode: false,
  vibrate: false,
} as PomodoroProps;
