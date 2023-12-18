import { PomodoroProps } from '../shared-types/pomodoro';

type ActionProps = { type: 'set_setting'; setting: PomodoroProps };

export const pomodoroReducer = (state: PomodoroProps, action: ActionProps) => {
  switch (action.type) {
    case 'set_setting':
      return { ...state, ...action.setting };

    default:
      return state;
  }
};
