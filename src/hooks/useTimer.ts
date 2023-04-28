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
  const [timeCoutingStatus, setTimeCountingSatus] = useState(false);
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

  const startTime = useCallback(() => {
    play.volume = volume;
    play.play();
    setTimeCountingSatus(true);
    setWorking(true);
    setPause(true);
    setMainTime(timer.pomodoroTime);
    setLabel('pomodoroTime');
  }, [timer.pomodoroTime, volume]);

  const configureToResting = useCallback(() => {
    rest.volume = volume;
    rest.play();
    setTimeCountingSatus(true);
    setWorking(false);
    setCompletedCycles(completedCycles + 1);

    if ((completedCycles + 1) % timer.cycles === 0) {
      setMainTime(timer.longRestTime);
      setLabel('longRestTime');
    } else {
      setMainTime(timer.shortRestTime);
      setLabel('shortRestTime');
    }
  }, [
    completedCycles,
    timer.cycles,
    timer.longRestTime,
    timer.shortRestTime,
    volume,
  ]);

  useEffect(() => {
    setMainTime(timer.pomodoroTime);
    return;
  }, [timer.pomodoroTime]);

  useEffect(() => {
    if (mainTime > 0) return;

    if (working) {
      configureToResting();
    }

    if (!working) startTime();
  }, [mainTime, working, completedCycles, configureToResting, startTime]);

  return {
    mainTime,
    pause,
    label,
    timeCoutingStatus,
    completedCycles,
    timer,
    working,
    startTime,
    setMainTime,
    setLabel,
    setWorking,
    setTimeCountingSatus,
  };
};
