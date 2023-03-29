import { useTimer } from '../../hooks/useTimer';
import { DisplayButton } from '../DisplayButton';
import { Timer } from '../Timer';

export const Pomodoro = () => {
  const {
    pomodoroTime,
    shortRestTime,
    longRestTime,
    mainTime,
    label,
    restart,
    startCoutingStatus,
    timeCoutingStatus,
    completedCycles,
    working,
    setMainTime,
    setLabel,
    setWorking,
    startTime,
    setTimeCountingSatus,
  } = useTimer();

  const displayPomodoroTime = () => {
    setMainTime(pomodoroTime);
    setWorking(true);
    setTimeCountingSatus(false);
    setLabel('pomodoroTime');
  };
  const displayShortBreakTime = () => {
    setMainTime(shortRestTime);
    setTimeCountingSatus(false);
    setLabel('shortRestTime');
  };
  const displayLongBreakTime = () => {
    setMainTime(longRestTime);
    setTimeCountingSatus(false);
    setLabel('longRestTime');
  };

  return (
    <div className="flex flex-col items-center">
      <div className="my-6 flex gap-4">
        <DisplayButton text="Pomodoro" onClick={displayPomodoroTime} />
        <DisplayButton text="Short Break" onClick={displayShortBreakTime} />
        <DisplayButton text="Long Break" onClick={displayLongBreakTime} />
      </div>
      <Timer timer={mainTime} label={label} working={working} />
      <div className="my-4 flex gap-4">
        <button
          onClick={startTime}
          className="rounded-md border-2 p-1 text-lg font-semibold uppercase shadow-lg transition duration-300 ease-in-out hover:border-bluishPurple hover:text-bluishPurple hover:shadow-bluishPurple/30"
        >
          {restart ? 'Restart' : 'Start'}
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
