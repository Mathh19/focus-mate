import { useState, useEffect, useCallback } from 'react';
import { useInterval } from '../../hooks/use-interval';
import { Button } from '../Button';
import { Timer } from '../Timer';
import { times } from '../../times';

export const Pomodoro = () => {
  const [mainTime, setMainTime] = useState(times.pomodoroTime);
  const [timeCoutingStatus, setTimeCountingSatus] = useState(false);
  const [working, setWorking] = useState(false);
  const [resting, setResting] = useState(false);
  const [fullWorkingTime, setFullWorkingTime] = useState(0);
  const [completedCycles, setCompletedCycles] = useState(0);
  const [startCoutingStatus, setStartCoutingStatus] = useState(false);

  useInterval(
    () => {
      setMainTime(mainTime - 1);
      if (working) setFullWorkingTime(fullWorkingTime + 1);
    },
    timeCoutingStatus ? 1000 : null,
  );

  const startTime = () => {
    setTimeCountingSatus(true);
    setWorking(true);
    setResting(false);
    setStartCoutingStatus(true);
    setMainTime(times.pomodoroTime);
  };

  const configureToResting = useCallback(() => {
    setTimeCountingSatus(true);
    setWorking(false);
    setResting(true);
    setCompletedCycles(completedCycles + 1);

    if ((completedCycles + 1) % times.cycles === 0) {
      setMainTime(times.longRestTime);
    } else {
      setMainTime(times.shortsRestTime);
    }
  }, [completedCycles]);

  useEffect(() => {
    if (mainTime > 0) return;

    if (working) {
      configureToResting();
    }

    if (resting) startTime();
  }, [mainTime, working, completedCycles, resting, configureToResting]);

  const displayMainTime = () => {
    setMainTime(times.pomodoroTime);
    setWorking(true);
    setTimeCountingSatus(false);
  };
  const displayShortBreakTime = () => {
    setMainTime(times.shortsRestTime);
    setTimeCountingSatus(false);
  };
  const displayLongBreakTime = () => {
    setMainTime(times.longRestTime);
    setTimeCountingSatus(false);
  };

  return (
    <div className="flex flex-col items-center">
      <div className="my-6 flex gap-4">
        <Button text="Pomodoro" onClick={displayMainTime} />
        <Button text="Short Break" onClick={displayShortBreakTime} />
        <Button text="Long Break" onClick={displayLongBreakTime} />
      </div>
      <Timer timer={mainTime} working={working} />
      <div className="my-4 flex gap-4">
        <button
          onClick={startTime}
          className="rounded-md border-2 p-1 text-lg font-semibold uppercase shadow-lg transition duration-300 ease-in-out hover:border-bluishPurple hover:text-bluishPurple hover:shadow-bluishPurple/30"
        >
          start
        </button>
        {startCoutingStatus && (
          <button
            onClick={() => setTimeCountingSatus(!timeCoutingStatus)}
            className="rounded-md border-2 p-1 text-lg font-semibold uppercase shadow-lg transition duration-300 ease-in-out hover:border-bluishPurple hover:text-bluishPurple hover:shadow-bluishPurple/30"
          >
            {timeCoutingStatus ? 'pause' : 'play'}
          </button>
        )}
      </div>
      <div className="font-bold">
        <p>Completed cycles: {completedCycles}</p>
      </div>
    </div>
  );
};
