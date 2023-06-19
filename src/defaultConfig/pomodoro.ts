import { ConfigPomodoroProps, TimerProps } from '../shared-types/pomodoro';

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
    theme: 'defaultTheme',
    notification: false,
    weeklyTasksMode: false,
  } as ConfigPomodoroProps,
};
