import {
  useCallback,
  useContext,
  useEffect,
  useReducer,
  useState,
} from 'react';
import { AuthContext } from '../contexts/AuthContext/AuthContext';
import { PomodoroProps, ThemeProps } from '../shared-types/pomodoro';
import { useFetch } from './useFetch';
import { useLocalStorage } from './useLocalStorage';
import { defaultPomodoro } from '../defaultConfig/pomodoro';
import { updateSettingAPI } from '../services/pomodoro';
import { pomodoroReducer } from '../reduces/pomodoroReducer';

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

  const [state, dispatch] = useReducer(pomodoroReducer, storedValue);

  const handleSetSettingPomodoro = useCallback(
    (setting: PomodoroProps) => {
      if (signed) {
        updateSettingAPI(setting);
        setPomodoro(setting);
        return;
      }
      dispatch({ type: 'set_setting', setting: setting });
    },
    [signed],
  );

  useEffect(() => {
    if (error) return console.log(error);

    if (signed && data) {
      setPomodoro({ ...data, volume: [data.volume] });
    }

    if (!signed) {
      setPomodoro(state);
    }
  }, [data, error, signed, state]);

  useEffect(() => {
    setValue(state);
  }, [setValue, state]);

  return {
    pomodoro,
    handleSetSettingPomodoro,
  };
};
