export type TimerProps = {
  pomodoroTime: number;
  shortRestTime: number;
  longRestTime: number;
  cycles: number;
};

export const defaultTimer = {
  pomodoroTime: 1500,
  shortRestTime: 300,
  longRestTime: 900,
  cycles: 4,
} as TimerProps;
