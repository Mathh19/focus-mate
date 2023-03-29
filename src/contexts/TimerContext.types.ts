export type TimerContextProps = {
  pomodoroTime: number;
  shortRestTime: number;
  longRestTime: number;
  cycles: number;
  setTimes?: () => void;
};
