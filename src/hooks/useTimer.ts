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
  const { pomodoro } = useContext(PomodoroContext);
  const { playBell, restBell } = useSound();

  const [mainTime, setMainTime] = useState(pomodoro.pomodoroTime);
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
    pomodoro.vibrate && navigator.vibrate(200);
    setTimeCountingStatus(true);
    setWorking(true);
    setPause(true);
    setMainTime(pomodoro.pomodoroTime);
    setCurrentStatusPomodoro('pomodoroTime');
    if (pomodoro.notification && !isMobile) {
      sendNotification("It's time for a work!", {
        body: workMessage,
        image: workImage,
        icon: iconNotification,
      });
    }
    if (!pomodoro.auto) {
      if (completedCycles > 0) {
        setTimeCountingStatus(false);
      }
    }
  }, [completedCycles, pomodoro, playBell]);

  const configureToResting = useCallback(() => {
    restBell.play();
    pomodoro.vibrate && navigator.vibrate(200);
    setTimeCountingStatus(true);
    setWorking(false);
    setCompletedCycles((prevCompletedCycles) => prevCompletedCycles + 1);

    if ((completedCycles + 1) % pomodoro.cycles === 0) {
      if (pomodoro.notification && !isMobile) {
        sendNotification("It's time for a long break!", {
          body: randomLongBreakMessage,
          image: longRestImage,
          icon: iconNotification,
        });
      }
      setMainTime(pomodoro.longRestTime);
      setCurrentStatusPomodoro('longRestTime');
      if (!pomodoro.auto) {
        setTimeCountingStatus(false);
      }
    } else {
      if (pomodoro.notification && !isMobile) {
        sendNotification("It's time for a break!", {
          body: randomShortBreakMessage,
          image: shortRestImage,
          icon: iconNotification,
        });
      }
      setMainTime(pomodoro.shortRestTime);
      setCurrentStatusPomodoro('shortRestTime');
      if (!pomodoro.auto) {
        setTimeCountingStatus(false);
      }
    }
  }, [completedCycles, pomodoro, restBell]);

  const nextTime = () => {
    if (working) {
      return configureToResting();
    }
    return startTimer();
  };

  useEffect(() => {
    if (currentStatusPomodoro === 'pomodoroTime') {
      setMainTime(pomodoro.pomodoroTime);
    } else if (currentStatusPomodoro === 'shortRestTime') {
      setMainTime(pomodoro.shortRestTime);
    } else {
      setMainTime(pomodoro.longRestTime);
    }
  }, [currentStatusPomodoro, pomodoro]);

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
    pomodoro,
  ]);

  return {
    pomodoro,
    mainTime,
    pause,
    currentStatusPomodoro,
    timeCountingStatus,
    completedCycles,
    startTimer,
    setMainTime,
    setCurrentStatusPomodoro,
    setTimeCountingStatus,
    nextTime,
  };
};
