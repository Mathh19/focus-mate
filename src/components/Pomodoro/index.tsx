import { useState, useEffect } from 'react';
import { FiSkipForward } from 'react-icons/fi';
import { useTimer } from '../../hooks/useTimer';
import { DisplayTimeButton } from '../UI/DisplayTimeButton';
import { Timer } from '../Timer';
import { Head } from '../Head';
import { Tasks } from '../Tasks';
import { FeedbackCycles } from '../UI/FeedbackCycles';
import { useSound } from '../../hooks/useSound';

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
          <button onClick={startTimer} className="btn-control">
            Start
          </button>
        )}
        {pause && (
          <div className="relative flex w-36 items-center justify-center">
            <button
              onClick={handleControlCountingStatus}
              className="btn-control"
            >
              {timeCountingStatus ? 'pause' : 'play'}
            </button>
            <button onClick={nextTime} className="absolute right-2">
              <FiSkipForward className="text-2xl transition duration-300 ease-in-out hover:text-skin-secondary-text" />
            </button>
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
