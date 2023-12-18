import { PomodoroProps } from '../../shared-types/pomodoro';

export type PomodoroContextProps = {
  pomodoro: PomodoroProps;
  setSettingPomodoro: (setting: PomodoroProps) => void;
};
