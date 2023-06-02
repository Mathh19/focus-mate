import { useCallback, useContext, useEffect, useState } from 'react';
import { isMobile } from 'react-device-detect';
import { PomodoroContext } from '../contexts/PomodoroContext/PomodoroContext';
import { useInterval } from './useInterval';
import playBell from '../sounds/play-bell-ding.mp3';
import restBell from '../sounds/rest-bell-ding.mp3';
import { sendNotification } from '../utils/sendNotification';
import {
  randomLongBreakMessage,
  randomShortBreakMessage,
  workMessage,
} from '../content/notification-messages';
import shortRestImage from '../imgs/Icon-Notifcation-Short-Break.png';
import longRestImage from '../imgs/Icon-Notifcation-Long-Break.png';
import workImage from '../imgs/Icon-Notifcation-Work.png';
import iconNotification from '../imgs/Icon-Notification.png';

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
    if (configPomodoro.notification && !isMobile) {
      sendNotification("It's time for a work!", {
        body: workMessage,
        image: workImage,
        icon: iconNotification,
      });
    }
    if (!configPomodoro.auto) {
      if (completedCycles > 0) {
        setTimeCountingStatus(false);
      }
    }
  }, [
    completedCycles,
    configPomodoro.auto,
    configPomodoro.notification,
    timer.pomodoroTime,
    volume,
  ]);

  const configureToResting = useCallback(() => {
    rest.volume = volume;
    rest.play();
    setTimeCountingStatus(true);
    setWorking(false);
    setCompletedCycles((prevCompletedCycles) => prevCompletedCycles + 1);

    if ((completedCycles + 1) % timer.cycles === 0) {
      if (configPomodoro.notification && !isMobile) {
        sendNotification("It's time for a long break!", {
          body: randomLongBreakMessage,
          image: longRestImage,
          icon: iconNotification,
        });
      }
      setMainTime(timer.longRestTime);
      setLabel('longRestTime');
      if (!configPomodoro.auto) {
        setTimeCountingStatus(false);
      }
    } else {
      if (configPomodoro.notification && !isMobile) {
        sendNotification("It's time for a break!", {
          body: randomShortBreakMessage,
          image: shortRestImage,
          icon: iconNotification,
        });
      }
      setMainTime(timer.shortRestTime);
      setLabel('shortRestTime');
      if (!configPomodoro.auto) {
        setTimeCountingStatus(false);
      }
    }
  }, [
    completedCycles,
    configPomodoro.auto,
    configPomodoro.notification,
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
  }, [
    mainTime,
    working,
    completedCycles,
    configureToResting,
    startTimer,
    configPomodoro.notification,
  ]);

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
