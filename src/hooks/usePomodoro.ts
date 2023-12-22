import { useCallback, useContext, useEffect, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext/AuthContext';
import { PomodoroProps, ThemeProps } from '../shared-types/pomodoro';
import { useFetch } from './useFetch';
import { useLocalStorage } from './useLocalStorage';
import { defaultPomodoro } from '../defaultConfig/pomodoro';
import { updateSettingAPI } from '../services/pomodoro';

type DataPomodoroProps = {
  pomodoroTime: number;
  shortRestTime: number;
  longRestTime: number;
  cycles: number;
  auto: boolean;
  volume: number;
  theme: ThemeProps;
  notification: boolean;
  routineMode: boolean;
  vibrate: boolean;
};

export const usePomodoro = () => {
  const { signed } = useContext(AuthContext);
  const { data, error } = useFetch<DataPomodoroProps>('/setting');
  const { storedValue, setValue } = useLocalStorage<PomodoroProps>(
    'pomodoro',
    defaultPomodoro,
  );

  const [pomodoro, setPomodoro] = useState<PomodoroProps>(storedValue);

  const handleSetSettingPomodoro = useCallback(
    (setting: PomodoroProps) => {
      if (signed) updateSettingAPI(setting);
      if (!signed) setValue(setting);
      setPomodoro(setting);
    },
    [setValue, signed],
  );

  useEffect(() => {
    if (error) return console.log(error);

    if (signed && data) setPomodoro({ ...data, volume: [data.volume] });

    if (!signed) setPomodoro(storedValue);
  }, [data, error, signed, storedValue]);

  return {
    pomodoro,
    handleSetSettingPomodoro,
  };
};
