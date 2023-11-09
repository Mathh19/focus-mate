import { useCallback, useContext, useEffect, useState } from 'react';
import { isMobile } from 'react-device-detect';
import { PomodoroContext } from '../contexts/PomodoroContext/PomodoroContext';
import { useInterval } from './useInterval';
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
import { useSound } from './useSound';

export const useTimer = () => {
  const { timer, configPomodoro } = useContext(PomodoroContext);
  const { playBell, restBell } = useSound();

  const [mainTime, setMainTime] = useState(timer.pomodoroTime);
  const [timeCountingStatus, setTimeCountingStatus] = useState(false);
  const [working, setWorking] = useState(false);
  const [completedCycles, setCompletedCycles] = useState(0);
  const [pause, setPause] = useState(false);
  const [currentStatusPomodoro, setCurrentStatusPomodoro] = useState<
    'pomodoroTime' | 'shortRestTime' | 'longRestTime'
  >('pomodoroTime');

  useInterval(
    () => {
      setMainTime(mainTime - 1);
    },
    timeCountingStatus ? 1000 : null,
  );

  const startTimer = useCallback(() => {
    playBell.play();
    configPomodoro.vibrate && navigator.vibrate(200);
    setTimeCountingStatus(true);
    setWorking(true);
    setPause(true);
    setMainTime(timer.pomodoroTime);
    setCurrentStatusPomodoro('pomodoroTime');
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
    configPomodoro.vibrate,
    playBell,
    timer.pomodoroTime,
  ]);

  const configureToResting = useCallback(() => {
    restBell.play();
    configPomodoro.vibrate && navigator.vibrate(200);
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
      setCurrentStatusPomodoro('longRestTime');
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
      setCurrentStatusPomodoro('shortRestTime');
      if (!configPomodoro.auto) {
        setTimeCountingStatus(false);
      }
    }
  }, [
    completedCycles,
    configPomodoro.auto,
    configPomodoro.notification,
    configPomodoro.vibrate,
    restBell,
    timer.cycles,
    timer.longRestTime,
    timer.shortRestTime,
  ]);

  const nextTime = () => {
    if (working) {
      return configureToResting();
    }
    return startTimer();
  };

  useEffect(() => {
    if (currentStatusPomodoro === 'pomodoroTime') {
      setMainTime(timer.pomodoroTime);
    } else if (currentStatusPomodoro === 'shortRestTime') {
      setMainTime(timer.shortRestTime);
    } else {
      setMainTime(timer.longRestTime);
    }
  }, [currentStatusPomodoro, timer]);

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
    currentStatusPomodoro,
    timeCountingStatus,
    completedCycles,
    timer,
    startTimer,
    setMainTime,
    setCurrentStatusPomodoro,
    setTimeCountingStatus,
    nextTime,
  };
};
