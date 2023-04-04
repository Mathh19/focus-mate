import { useState, useEffect } from 'react';
import { useTimer } from '../../hooks/useTimer';
import { DisplayButton } from '../DisplayButton';
import { Timer } from '../Timer';
import { Head } from '../Head';

export const Pomodoro = () => {
  const {
    timer,
    mainTime,
    label,
    startCoutingStatus,
    timeCoutingStatus,
    completedCycles,
    setMainTime,
    setLabel,
    setWorking,
    startTime,
    setTimeCountingSatus,
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
      startCoutingStatus && setTitle('Pomodoro Time');
    } else if (label === 'shortRestTime') {
      setFocusPomodoroTime(false);
      setFocusShortRestTime(true);
      setFocusLongRestTime(false);
      startCoutingStatus && setTitle('Short Rest Time');
    } else {
      setFocusPomodoroTime(false);
      setFocusShortRestTime(false);
      setFocusLongRestTime(true);
      startCoutingStatus && setTitle('Long Rest Time');
    }

    if (timeCoutingStatus) {
      startCoutingStatus && setIcon('/assets/run-pomodoro.svg');
    } else {
      startCoutingStatus && setTitle('Stoped');
      startCoutingStatus && setIcon('/assets/stop-pomodoro.svg');
    }
  }, [label, startCoutingStatus, timeCoutingStatus]);

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
    <main className="flex flex-col items-center">
      <Head title={title} icon={icon} />
      <div className="m-6 flex flex-wrap gap-4">
        <DisplayButton
          focused={focusPomodoroTime}
          text="Pomodoro"
          onClick={displayPomodoroTime}
        />
        <DisplayButton
          focused={focusShortRestTime}
          text="Short Break"
          onClick={displayShortBreakTime}
        />
        <DisplayButton
          focused={focusLongRestTime}
          text="Long Break"
          onClick={displayLongBreakTime}
        />
      </div>
      <Timer timer={mainTime} label={label} />
      <div className="my-4">
        {!startCoutingStatus && (
          <button
            onClick={startTime}
            className="rounded-md border-2 p-1 text-lg font-semibold uppercase shadow-lg transition duration-300 ease-in-out hover:translate-y-1 hover:border-bluishPurple hover:text-bluishPurple hover:shadow-bluishPurple/30"
          >
            Start
          </button>
        )}
        {startCoutingStatus && (
          <button
            onClick={() => setTimeCountingSatus(!timeCoutingStatus)}
            className="rounded-md border-2 p-1 text-lg font-semibold uppercase shadow-lg transition duration-300 ease-in-out hover:translate-y-1 hover:border-bluishPurple hover:text-bluishPurple hover:shadow-bluishPurple/30"
          >
            {timeCoutingStatus ? 'pause' : 'play'}
          </button>
        )}
      </div>
      <div className="font-bold">
        <p>Completed cycles: {completedCycles}</p>
      </div>
    </main>
  );
};
