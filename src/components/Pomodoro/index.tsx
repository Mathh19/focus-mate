import { useState, useEffect } from 'react';
import { useInterval } from '../../hooks/use-interval';
import { Button } from '../Button';
import { Timer } from '../Timer';
import { times } from '../../times';

export const Pomodoro = () => {
  const [mainTime, setMainTime] = useState(times.pomodoroTime);
  const [timeCoutingStatus, setTimeCountingSatus] = useState(false);
  const [cyclesQtdManager, setCyclesQtdManager] = useState(
    new Array(times.cycles - 1).fill(true),
  );
  const [working, setWorking] = useState(false);
  const [restTime, setRestTime] = useState(false);
  const [fullWorkingTime, setFullWorkingTime] = useState(0);
  const [numberOfPomodoros, setNumberOfPomodoros] = useState(0);
  const [completedCycles, setCompletedCycles] = useState(0);

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
    setMainTime(times.pomodoroTime);
  };

  const configureRest = (long: boolean) => {
    setTimeCountingSatus(true);
    setWorking(false);
    setRestTime(true);

    if (long) {
      setMainTime(times.longRestTime);
    } else {
      setMainTime(times.shortsRestTime);
    }
  };

  useEffect(() => {
    if (mainTime > 0) return;

    if (working && cyclesQtdManager.length > 0) {
      configureRest(false);
      cyclesQtdManager.pop();
    } else if (working && cyclesQtdManager.length <= 0) {
      configureRest(true);
      setCyclesQtdManager(new Array(times.cycles - 1).fill(true));
      setCompletedCycles(completedCycles + 1);
    }

    if (working) setNumberOfPomodoros(numberOfPomodoros + 1);
    if (restTime) startTime();
  }, [
    completedCycles,
    cyclesQtdManager,
    mainTime,
    numberOfPomodoros,
    restTime,
    setCompletedCycles,
    working,
  ]);
  console.log(cyclesQtdManager);

  const displayMainTime = () => {
    setMainTime(times.pomodoroTime);
  };
  const displayShortBreakTime = () => {
    setMainTime(times.shortsRestTime);
  };
  const displayLongBreakTime = () => {
    setMainTime(times.longRestTime);
  };

  return (
    <div className="flex flex-col items-center">
      <div className="my-6 flex gap-4">
        <Button text="Pomodoro" onClick={displayMainTime} />
        <Button text="Short Break" onClick={displayShortBreakTime} />
        <Button text="Long Break" onClick={displayLongBreakTime} />
      </div>
      <Timer timer={mainTime} working={working} />
      <button
        onClick={startTime}
        className="my-4 rounded-md border-2 p-1 text-lg font-semibold uppercase transition duration-300 ease-in-out hover:border-bluishPurple hover:text-bluishPurple"
      >
        start
      </button>
      <div className="font-bold">
        <p>Completed cycles: {completedCycles}</p>
      </div>
    </div>
  );
};
