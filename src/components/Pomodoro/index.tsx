import { useState, useEffect } from 'react';
import { useTimer } from '../../hooks/useTimer';
import { DisplayTimeButton } from '../DisplayTimeButton';
import { Timer } from '../Timer';
import { Head } from '../Head';
import { Tasks } from '../Tasks';
import { FiSkipForward } from 'react-icons/fi';

export const Pomodoro = () => {
  const {
    timer,
    mainTime,
    label,
    pause,
    timeCoutingStatus,
    completedCycles,
    setMainTime,
    setLabel,
    setWorking,
    startTime,
    setTimeCountingSatus,
    nextTime,
  } = useTimer();
  const [focusPomodoroTime, setFocusPomodoroTime] = useState(true);
  const [focusShortRestTime, setFocusShortRestTime] = useState(false);
  const [focusLongRestTime, setFocusLongRestTime] = useState(false);
  const [title, setTitle] = useState('');
  const [icon, setIcon] = useState('');

  useEffect(() => {
    if (label === 'pomodoroTime') {
      setFocusPomodoroTime(true);
      setFocusShortRestTime(false);
      setFocusLongRestTime(false);
      pause && setTitle('Pomodoro Time');
    } else if (label === 'shortRestTime') {
      setFocusPomodoroTime(false);
      setFocusShortRestTime(true);
      setFocusLongRestTime(false);
      pause && setTitle('Short Rest Time');
    } else {
      setFocusPomodoroTime(false);
      setFocusShortRestTime(false);
      setFocusLongRestTime(true);
      pause && setTitle('Long Rest Time');
    }

    if (timeCoutingStatus) {
      pause && setIcon('/run-pomodoro.svg');
    } else {
      pause && setTitle('Stoped');
      pause && setIcon('/stop-pomodoro.svg');
    }
  }, [label, pause, timeCoutingStatus]);

  const displayPomodoroTime = () => {
    setMainTime(timer.pomodoroTime);
    setWorking(true);
    setTimeCountingSatus(false);
    setLabel('pomodoroTime');
  };
  const displayShortBreakTime = () => {
    setMainTime(timer.shortRestTime);
    setTimeCountingSatus(false);
    setLabel('shortRestTime');
  };
  const displayLongBreakTime = () => {
    setMainTime(timer.longRestTime);
    setTimeCountingSatus(false);
    setLabel('longRestTime');
  };

  return (
    <main className="mx-2 my-5 flex min-h-screen flex-col items-center justify-center gap-6">
      <Head title={title} icon={icon} />
      <div className="flex gap-4">
        <DisplayTimeButton
          focused={focusPomodoroTime}
          text="Pomodoro"
          onClick={displayPomodoroTime}
        />
        <DisplayTimeButton
          focused={focusShortRestTime}
          text="Short Break"
          onClick={displayShortBreakTime}
        />
        <DisplayTimeButton
          focused={focusLongRestTime}
          text="Long Break"
          onClick={displayLongBreakTime}
        />
      </div>
      <Timer timer={mainTime} label={label} />
      <div className="flex flex-col items-center gap-4">
        {!pause && (
          <button
            onClick={startTime}
            className="rounded-md border-2 p-1 text-lg font-semibold uppercase shadow-lg transition duration-300 ease-in-out hover:translate-y-1 hover:border-bluishPurple hover:text-bluishPurple hover:shadow-bluishPurple/30"
          >
            Start
          </button>
        )}
        {pause && (
          <div className="relative flex w-full items-center justify-center">
            <button
              onClick={() => setTimeCountingSatus(!timeCoutingStatus)}
              className="rounded-md border-2 p-1 text-lg font-semibold uppercase shadow-lg transition duration-300 ease-in-out hover:translate-y-1 hover:border-bluishPurple hover:text-bluishPurple hover:shadow-bluishPurple/30"
            >
              {timeCoutingStatus ? 'pause' : 'play'}
            </button>
            <button onClick={nextTime} className="absolute right-2">
              <FiSkipForward className="text-2xl transition duration-300 ease-in-out hover:translate-y-1 hover:text-bluishPurple" />
            </button>
          </div>
        )}
        <p className="font-bold">Completed cycles: {completedCycles}</p>
      </div>
      <Tasks />
    </main>
  );
};
