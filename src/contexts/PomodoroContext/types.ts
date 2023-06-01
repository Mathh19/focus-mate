import { ConfigPomodoroProps, TimerProps } from '../../shared-types/pomodoro';

export type PomodoroContextProps = {
  timer: TimerProps;
  configPomodoro: ConfigPomodoroProps;
  setTimer: (newTimer: TimerProps) => void;
  setConfig: (newConfig: ConfigPomodoroProps) => void;
};
