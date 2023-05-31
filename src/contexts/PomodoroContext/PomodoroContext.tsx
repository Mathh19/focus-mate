import { createContext, useState, useEffect } from 'react';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { setClassTheme } from '../../utils/setClassTheme';
import { ConfigPomodoroProps, TimerProps } from '../../shared-types/pomodoro';
import { PomodoroContextProps } from './types';
import { defaultPomodoro } from '../../timer';

export const PomodoroContext = createContext({} as PomodoroContextProps);

export const PomodoroProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { storedValue: storedTimerValue, setValue: setTimerValue } =
    useLocalStorage('timer', defaultPomodoro.timer);
  const { storedValue: storedConfigValue, setValue: setConfigValue } =
    useLocalStorage('config', defaultPomodoro.config);
  const initialTimer = storedTimerValue;
  const initialConfig = storedConfigValue;

  const [timer, setTimer] = useState<TimerProps>(initialTimer);
  const [config, setConfig] = useState<ConfigPomodoroProps>(initialConfig);

  const handleSetTimer = (newTimer: TimerProps) => {
    setTimer((prevTimer) => ({
      ...prevTimer,
      ...newTimer,
    }));
    setTimerValue(newTimer);
  };

  const handleSetConfig = (config: ConfigPomodoroProps) => {
    setConfig((prevState) => ({
      ...prevState,
      ...config,
    }));
    setConfigValue(config);
  };

  useEffect(() => {
    setClassTheme(config.theme);
  }, [config.theme]);

  return (
    <PomodoroContext.Provider
      value={{
        timer,
        configPomodoro: config,
        setTimer: handleSetTimer,
        setConfig: handleSetConfig,
      }}
    >
      {children}
    </PomodoroContext.Provider>
  );
};
