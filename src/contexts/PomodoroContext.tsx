import { createContext, useState } from 'react';
import { TimerProps, defaultTimer } from '../times';
import { PomodoroContextProps } from './PomodoroContext.types';

export const PomodoroContext = createContext({} as PomodoroContextProps);

const defaultTimesValue = () => {
  const timerStorage = localStorage.getItem('timer');
  if (timerStorage === null) {
    return defaultTimer;
  }
  return JSON.parse(timerStorage);
};

export const PomodoroProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const defaultTimer = defaultTimesValue();
  const [timer, setTimer] = useState({
    pomodoroTime: defaultTimer.pomodoroTime,
    shortRestTime: defaultTimer.shortRestTime,
    longRestTime: defaultTimer.longRestTime,
    cycles: defaultTimer.cycles,
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

  return (
    <PomodoroContext.Provider value={{ timer, setTimer: handleSetTimer }}>
      {children}
    </PomodoroContext.Provider>
  );
};
