import { useState, useEffect } from 'react';
import { FiSkipForward } from 'react-icons/fi';
import { useTimer } from '../../hooks/useTimer';
import { DisplayTimeButton } from './components/DisplayTimeButton';
import { Timer } from '../Timer';
import { Head } from '../Head';
import { Tasks } from '../Tasks';
import { FeedbackCycles } from '../UI/FeedbackCycles';
import { useSound } from '../../hooks/useSound';
import { Button } from '../UI/Button';

export const Pomodoro = () => {
  const {
    pomodoro,
    mainTime,
    currentStatusPomodoro,
    pause,
    timeCountingStatus,
    completedCycles,
    setMainTime,
    setCurrentStatusPomodoro,
    startTimer,
    setTimeCountingStatus,
    nextTime,
  } = useTimer();
  const { pauseSound } = useSound();
  const [title, setTitle] = useState('');
  const [icon, setIcon] = useState('');

  useEffect(() => {
    if (timeCountingStatus) {
      pause && setIcon('/run-pomodoro.ico');
      setTitle('');
    } else {
      pause && setTitle('Stopped • Pomodoro');
      pause && setIcon('/stop-pomodoro.ico');
    }
  }, [currentStatusPomodoro, pause, timeCountingStatus]);

  const displayTime = (
    time: number,
    currentStatusPomodoro: 'pomodoroTime' | 'shortRestTime' | 'longRestTime',
  ) => {
    setMainTime(time);
    setTimeCountingStatus(false);
    setCurrentStatusPomodoro(currentStatusPomodoro);
  };

  const handleControlCountingStatus = () => {
    pauseSound.play();
    setTimeCountingStatus(!timeCountingStatus);
  };

  return (
    <main className="mx-2 my-5 flex min-h-screen flex-col items-center justify-center gap-6 px-2">
      <Head title={title} icon={icon} />
      <div className="flex gap-4">
        <DisplayTimeButton
          focused={currentStatusPomodoro === 'pomodoroTime' && true}
          text="Pomodoro"
          onClick={() => displayTime(pomodoro.pomodoroTime, 'pomodoroTime')}
        />
        <DisplayTimeButton
          focused={currentStatusPomodoro === 'shortRestTime' && true}
          text="Short Break"
          onClick={() => displayTime(pomodoro.shortRestTime, 'shortRestTime')}
        />
        <DisplayTimeButton
          focused={currentStatusPomodoro === 'longRestTime' && true}
          text="Long Break"
          onClick={() => displayTime(pomodoro.longRestTime, 'longRestTime')}
        />
      </div>
      <Timer timer={mainTime} label={currentStatusPomodoro} />
      <div className="flex flex-col items-center gap-4">
        {!pause && (
          <Button
            onClick={startTimer}
            text="Start"
            className="rounded-md border-2 bg-transparent p-1 text-lg font-semibold uppercase hover:border-skin-border-primary hover:bg-transparent hover:text-skin-secondary-text active:bg-transparent"
          />
        )}
        {pause && (
          <div className="relative flex w-36 items-center justify-center">
            <Button
              onClick={handleControlCountingStatus}
              text={timeCountingStatus ? 'pause' : 'play'}
              className="rounded-md border-2 bg-transparent p-1 text-lg font-semibold uppercase hover:border-skin-border-primary hover:bg-transparent hover:text-skin-secondary-text active:bg-transparent"
            />
            <Button
              onClick={nextTime}
              aria-label="skip timer"
              icon={
                <FiSkipForward className="text-2xl transition duration-300 ease-in-out hover:text-skin-secondary-text" />
              }
              className="absolute right-2 bg-transparent p-0 hover:bg-transparent active:bg-transparent"
            />
          </div>
        )}
        <h2 className="text-xl font-bold">
          Cycles {completedCycles}/{pomodoro.cycles}
        </h2>
        <FeedbackCycles
          cycles={pomodoro.cycles}
          completedCycles={completedCycles}
        />
      </div>
      <Tasks />
    </main>
  );
};
