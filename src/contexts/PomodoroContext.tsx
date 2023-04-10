import { createContext, useState } from 'react';
import { TimerProps, defaultTimer } from '../times';
import { ConfigPomodoroProps, PomodoroContextProps } from './types';

export const PomodoroContext = createContext({} as PomodoroContextProps);

const defaultTimesValue = () => {
  const timerStorage = localStorage.getItem('timer');
  if (timerStorage === null) {
    return defaultTimer;
  }
  return JSON.parse(timerStorage);
};

const defaultConfigValue = () => {
  const defaultConfig = {
    configPomodoro: {
      volume: [100],
    },
  };
  const configStorage = localStorage.getItem('configPomodoro');
  if (configStorage === null) {
    return defaultConfig;
  }
  return JSON.parse(configStorage);
};

export const PomodoroProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const defaultTimer = defaultTimesValue();
  const defaultConfig: ConfigPomodoroProps = defaultConfigValue();

  const [timer, setTimer] = useState({
    pomodoroTime: defaultTimer.pomodoroTime,
    shortRestTime: defaultTimer.shortRestTime,
    longRestTime: defaultTimer.longRestTime,
    cycles: defaultTimer.cycles,
  });
  const [config, setConfig] = useState<ConfigPomodoroProps>({
    configPomodoro: defaultConfig.configPomodoro,
  });

  const handleSetTimer = (newTimer: TimerProps) => {
    const inSeconds = {
      pomodoroTime: newTimer.pomodoroTime,
      shortRestTime: newTimer.shortRestTime,
      longRestTime: newTimer.longRestTime,
      cycles: newTimer.cycles,
    };
    setTimer((prevTimer) => ({
      ...prevTimer,
      ...inSeconds,
    }));
    localStorage.setItem('timer', JSON.stringify(inSeconds));
  };

  const handleSetConfig = (config: ConfigPomodoroProps) => {
    setConfig((prevState) => ({
      ...prevState,
      ...config,
    }));
    localStorage.setItem('configPomodoro', JSON.stringify(config));
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
