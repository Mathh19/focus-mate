import { createContext, useState } from 'react';
import { TimerProps, defaultTimer } from '../times';
import { TimerContextProps } from './TimerContext.types';

export const TimerContext = createContext({} as TimerContextProps);

const defaultTimesValue = () => {
  const timerStorage = localStorage.getItem('timer');
  if (timerStorage === null) {
    return defaultTimer;
  }
  return JSON.parse(timerStorage);
};

export const TimerProvider = ({ children }: { children: React.ReactNode }) => {
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
    <TimerContext.Provider value={{ timer, setTimer: handleSetTimer }}>
      {children}
    </TimerContext.Provider>
  );
};
