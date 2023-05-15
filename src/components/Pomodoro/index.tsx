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
    startTime,
    setTimeCountingSatus,
    nextTime,
  } = useTimer();
  const [title, setTitle] = useState('');
  const [icon, setIcon] = useState('');

  useEffect(() => {
    if (label === 'pomodoroTime') {
      pause && setTitle('Pomodoro Time');
    } else if (label === 'shortRestTime') {
      pause && setTitle('Short Rest Time');
    } else {
      pause && setTitle('Long Rest Time');
    }

    if (timeCoutingStatus) {
      pause && setIcon('/run-pomodoro.svg');
    } else {
      pause && setTitle('Stoped');
      pause && setIcon('/stop-pomodoro.svg');
    }
  }, [label, pause, timeCoutingStatus]);

  const displayTime = (
    time: number,
    labelTime: 'pomodoroTime' | 'shortRestTime' | 'longRestTime',
  ) => {
    setMainTime(time);
    setTimeCountingSatus(false);
    setLabel(labelTime);
  };

  return (
    <main className="mx-2 my-5 flex min-h-screen flex-col items-center justify-center gap-6">
      <Head title={title} icon={icon} />
      <div className="flex gap-4">
        <DisplayTimeButton
          focused={label === 'pomodoroTime' && true}
          text="Pomodoro"
          onClick={() => displayTime(timer.pomodoroTime, 'pomodoroTime')}
        />
        <DisplayTimeButton
          focused={label === 'shortRestTime' && true}
          text="Short Break"
          onClick={() => displayTime(timer.shortRestTime, 'shortRestTime')}
        />
        <DisplayTimeButton
          focused={label === 'longRestTime' && true}
          text="Long Break"
          onClick={() => displayTime(timer.longRestTime, 'longRestTime')}
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
