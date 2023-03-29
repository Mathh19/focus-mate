import { createContext, useState } from 'react';
import { times } from '../times';
import { TimerContextProps } from './TimerContext.types';

export const TimerContext = createContext<TimerContextProps>({
  pomodoroTime: times.pomodoroTime,
  shortRestTime: times.shortRestTime,
  longRestTime: times.longRestTime,
  cycles: times.cycles,
});

export const TimerProvider = (children: React.ReactNode) => {
  const [timer, setTimer] = useState({
    pomodoroTime: times.pomodoroTime,
    shortRestTime: times.shortRestTime,
    longRestTime: times.longRestTime,
    cycles: times.cycles,
  });

  const value = {
    timer,
    setTimer,
  };

  <TimerContext.Provider value={{ ...value.timer }}>
    {children}
  </TimerContext.Provider>;
};
