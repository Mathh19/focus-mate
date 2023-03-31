import { createContext, useState } from 'react';
import { TimeProps, times } from '../times';
import { TimerContextProps } from './TimerContext.types';

export const TimerContext = createContext({} as TimerContextProps);

const defaultTimesValue = () => {
  const timerStorage = localStorage.getItem('times');
  if (timerStorage === null) {
    return times;
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

  const handleSetTimer = (newTimer: TimeProps) => {
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
    localStorage.setItem('times', JSON.stringify(inSeconds));
  };

  return (
    <TimerContext.Provider value={{ timer, setTimer: handleSetTimer }}>
      {children}
    </TimerContext.Provider>
  );
};
