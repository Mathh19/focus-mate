import { PomodoroProps } from '../shared-types/pomodoro';
import { api } from './api';

export const updateSettingAPI = async (setting: PomodoroProps) => {
  try {
    const settingValidate = { ...setting, volume: setting.volume[0] };
    const response = await api.patch('/setting', settingValidate);
    return response.data;
  } catch (error) {
    console.error('Error update pomodoro:', error);
    throw error;
  }
};
