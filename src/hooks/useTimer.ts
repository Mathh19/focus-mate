import { useCallback, useContext, useEffect, useState } from 'react';
import { TimerContext } from '../contexts/TimerContext';
import { useInterval } from './useInterval';
import playBell from '../sounds/play-bell-ding.mp3';
import restBell from '../sounds/rest-bell-ding.mp3';

const play = new Audio(playBell);
const rest = new Audio(restBell);
export const useTimer = () => {
  const { timer } = useContext(TimerContext);
  const [mainTime, setMainTime] = useState(timer.pomodoroTime);
  const [timeCoutingStatus, setTimeCountingSatus] = useState(false);
  const [working, setWorking] = useState(false);
  const [completedCycles, setCompletedCycles] = useState(0);
  const [startCoutingStatus, setStartCoutingStatus] = useState(false);
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
    play.play();
    setTimeCountingSatus(true);
    setWorking(true);
    setStartCoutingStatus(true);
    setMainTime(timer.pomodoroTime);
    setLabel('pomodoroTime');
  }, [timer.pomodoroTime]);

  const configureToResting = useCallback(() => {
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
  }, [completedCycles, timer.cycles, timer.longRestTime, timer.shortRestTime]);

  useEffect(() => {
    if (mainTime > 0) return;

    if (working) {
      configureToResting();
    }

    if (!working) startTime();
  }, [mainTime, working, completedCycles, configureToResting, startTime]);

  return {
    mainTime,
    startCoutingStatus,
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
