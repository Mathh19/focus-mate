export type TimeProps = {
  pomodoroTime: number;
  shortRestTime: number;
  longRestTime: number;
  cycles: number;
};

export const times = {
  pomodoroTime: 5,
  shortRestTime: 2,
  longRestTime: 9,
  cycles: 2,
} as TimeProps;
