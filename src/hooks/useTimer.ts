import { useCallback, useContext, useEffect, useState } from 'react';
import { PomodoroContext } from '../contexts/PomodoroContext/PomodoroContext';
import { useInterval } from './useInterval';
import playBell from '../sounds/play-bell-ding.mp3';
import restBell from '../sounds/rest-bell-ding.mp3';

const play = new Audio(playBell);
const rest = new Audio(restBell);

export const useTimer = () => {
  const { timer, configPomodoro } = useContext(PomodoroContext);
  const volume = configPomodoro.volume[0] / 100;

  const [mainTime, setMainTime] = useState(timer.pomodoroTime);
  const [timeCoutingStatus, setTimeCountingStatus] = useState(false);
  const [working, setWorking] = useState(false);
  const [completedCycles, setCompletedCycles] = useState(0);
  const [pause, setPause] = useState(false);
  const [label, setLabel] = useState<
    'pomodoroTime' | 'shortRestTime' | 'longRestTime'
  >('pomodoroTime');

  useInterval(
    () => {
      setMainTime(mainTime - 1);
    },
    timeCoutingStatus ? 1000 : null,
  );

  const startTimer = useCallback(() => {
    play.volume = volume;
    play.play();
    setTimeCountingStatus(true);
    setWorking(true);
    setPause(true);
    setMainTime(timer.pomodoroTime);
    setLabel('pomodoroTime');
    if (!configPomodoro.auto) {
      if (completedCycles > 0) {
        setTimeCountingStatus(false);
      }
    }
  }, [completedCycles, configPomodoro.auto, timer.pomodoroTime, volume]);

  const configureToResting = useCallback(() => {
    rest.volume = volume;
    rest.play();
    setTimeCountingStatus(true);
    setWorking(false);
    setCompletedCycles((prevCompletedCycles) => prevCompletedCycles + 1);

    if ((completedCycles + 1) % timer.cycles === 0) {
      setMainTime(timer.longRestTime);
      setLabel('longRestTime');
      if (!configPomodoro.auto) {
        setTimeCountingStatus(false);
      }
    } else {
      setMainTime(timer.shortRestTime);
      setLabel('shortRestTime');
      if (!configPomodoro.auto) {
        setTimeCountingStatus(false);
      }
    }
  }, [
    completedCycles,
    configPomodoro.auto,
    timer.cycles,
    timer.longRestTime,
    timer.shortRestTime,
    volume,
  ]);

  const nextTime = () => {
    if (working) {
      return configureToResting();
    }
    return startTimer();
  };

  useEffect(() => {
    if (label === 'pomodoroTime') {
      setMainTime(timer.pomodoroTime);
    } else if (label === 'shortRestTime') {
      setMainTime(timer.shortRestTime);
    } else {
      setMainTime(timer.longRestTime);
    }
  }, [label, timer]);

  useEffect(() => {
    if (mainTime <= 0) {
      if (working) {
        configureToResting();
      } else {
        startTimer();
      }
    }
  }, [mainTime, working, completedCycles, configureToResting, startTimer]);

  return {
    mainTime,
    pause,
    label,
    timeCoutingStatus,
    completedCycles,
    timer,
    startTimer,
    setMainTime,
    setLabel,
    setTimeCountingStatus,
    nextTime,
  };
};
