import { createContext, useEffect } from 'react';
import { setClassTheme } from '../../utils/setClassTheme';
import { PomodoroContextProps } from './types';
import { usePomodoro } from '../../hooks/usePomodoro';

export const PomodoroContext = createContext({} as PomodoroContextProps);

export const PomodoroProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { pomodoro, handleSetSettingPomodoro } = usePomodoro();

  useEffect(() => {
    setClassTheme(pomodoro.theme);
  }, [pomodoro.theme]);

  return (
    <PomodoroContext.Provider
      value={{
        pomodoro,
        setSettingPomodoro: handleSetSettingPomodoro,
      }}
    >
      {children}
    </PomodoroContext.Provider>
  );
};
