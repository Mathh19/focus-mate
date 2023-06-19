export type ThemeProps = 'defaultTheme' | 'blueTheme' | 'darkTheme';

export type TimerProps = {
  pomodoroTime: number;
  shortRestTime: number;
  longRestTime: number;
  cycles: number;
};

export type ConfigPomodoroProps = {
  auto: boolean;
  volume: number[];
  theme: ThemeProps;
  notification: boolean;
  weeklyTasksMode: boolean;
};
