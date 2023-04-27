import { createContext, useState } from 'react';
import { TimerProps, defaultTimer } from '../../timer';
import { ConfigPomodoroProps, PomodoroContextProps } from './types';
import { useLocalStorage } from '../../hooks/useLocalStorage';

export const PomodoroContext = createContext({} as PomodoroContextProps);

export const PomodoroProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { storedValue: storedTimerValue, setValue: setTimerValue } =
    useLocalStorage('timer', defaultTimer);
  const { storedValue: storedConfigValue, setValue: setConfigValue } =
    useLocalStorage('defaultConfig', {
      configPomodoro: { volume: [100] },
    } as ConfigPomodoroProps);
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

  return (
    <PomodoroContext.Provider
      value={{
        timer,
        configPomodoro: config.configPomodoro,
        setTimer: handleSetTimer,
        setConfig: handleSetConfig,
      }}
    >
      {children}
    </PomodoroContext.Provider>
  );
};
