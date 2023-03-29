import { useCallback, useContext, useEffect, useState } from 'react';
import { TimerContext } from '../contexts/TimerContext';
import { useInterval } from './useInterval';
import playBell from '../sounds/play-bell-ding.mp3';
import restBell from '../sounds/rest-bell-ding.mp3';

const play = new Audio(playBell);
const rest = new Audio(restBell);

export const useTimer = () => {
  const { pomodoroTime, shortRestTime, longRestTime, cycles } =
    useContext(TimerContext);
  const [mainTime, setMainTime] = useState(pomodoroTime);
  const [timeCoutingStatus, setTimeCountingSatus] = useState(false);
  const [working, setWorking] = useState(false);
  const [resting, setResting] = useState(false);
  const [fullWorkingTime, setFullWorkingTime] = useState(0);
  const [completedCycles, setCompletedCycles] = useState(0);
  const [startCoutingStatus, setStartCoutingStatus] = useState(false);
  const [restart, setRestart] = useState(false);
  const [label, setLabel] = useState<
    'pomodoroTime' | 'shortRestTime' | 'longRestTime'
  >('pomodoroTime');

  useInterval(
    () => {
      setMainTime(mainTime - 1);
      if (working) setFullWorkingTime(fullWorkingTime + 1);
    },
    timeCoutingStatus ? 1000 : null,
  );

  const startTime = useCallback(() => {
    play.play();
    setTimeCountingSatus(true);
    setWorking(true);
    setResting(false);
    setStartCoutingStatus(true);
    setRestart(true);
    setMainTime(pomodoroTime);
    setLabel('pomodoroTime');
  }, [pomodoroTime]);

  const configureToResting = useCallback(() => {
    rest.play();
    setTimeCountingSatus(true);
    setWorking(false);
    setResting(true);
    setCompletedCycles(completedCycles + 1);

    if ((completedCycles + 1) % cycles === 0) {
      setMainTime(longRestTime);
      setLabel('longRestTime');
    } else {
      setMainTime(shortRestTime);
      setLabel('shortRestTime');
    }
  }, [completedCycles, cycles, longRestTime, shortRestTime]);

  useEffect(() => {
    if (mainTime > 0) return;

    if (working) {
      configureToResting();
    }

    if (resting) startTime();
  }, [
    mainTime,
    working,
    completedCycles,
    resting,
    configureToResting,
    startTime,
  ]);

  return {
    mainTime,
    startCoutingStatus,
    restart,
    label,
    timeCoutingStatus,
    completedCycles,
    pomodoroTime,
    shortRestTime,
    longRestTime,
    cycles,
    working,
    startTime,
    setMainTime,
    setLabel,
    setWorking,
    setTimeCountingSatus,
  };
};
