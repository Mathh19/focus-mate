import { useContext } from 'react';
import {
  CircularProgressbarWithChildren,
  buildStyles,
} from 'react-circular-progressbar';
import { PomodoroContext } from '../../contexts/PomodoroContext/PomodoroContext';
import { secondsToMinutes } from '../../utils/secondsToMinutes';
import { TimerComponentProps } from './types';
import { Settings } from '../Settings';
import { TasksContext } from '../../contexts/TasksContext/TasksContext';
import { TimerProps } from '../../shared-types/pomodoro';
import { getCurrentDayOfWeek } from '../../utils/getCurrentDayOfWeek';

export const Timer = ({ timer, label }: TimerComponentProps) => {
  const { timer: timerContext, configPomodoro } = useContext(PomodoroContext);
  const { tasks } = useContext(TasksContext);
  const controlerTimer = timerContext[label as keyof TimerProps];
  const timerPercentage = (timer / controlerTimer) * 100;

  const currentDay = getCurrentDayOfWeek();

  const pathColor = () => {
    if (configPomodoro.theme === 'defaultTheme' || !configPomodoro.theme)
      return '#7564e2';
    if (configPomodoro.theme === 'blueTheme') return '#4f53ff';
    if (configPomodoro.theme === 'darkTheme') return '#636069';
  };

  const targetCurrentTask = tasks.filter(
    (currentTask) => currentTask.day === currentDay,
  );

  return (
    <div className="mx-2 w-full max-w-[384px]">
      <CircularProgressbarWithChildren
        strokeWidth={4}
        background
        backgroundPadding={3}
        value={timerPercentage}
        styles={buildStyles({
          backgroundColor:
            configPomodoro.theme === 'darkTheme' ? '#202020' : '#212034',
          pathColor: pathColor(),
          strokeLinecap: 'round',
        })}
        className="h-full w-full drop-shadow-lg"
      >
        <div className="flex h-[90%] w-[90%] flex-col items-center justify-center gap-2 rounded-full border-[2px] border-bluishPurple shadow-shadowAllSides shadow-bluishPurple blueTheme:border-blueTheme blueTheme:shadow-blueTheme dark:border-darkTheme dark:shadow-darkTheme">
          <span className="font-sans text-8xl font-semibold max-[400px]:text-[5rem]">
            {secondsToMinutes(timer)}
          </span>
          <p className="font-semibold">
            {label === 'pomodoroTime' ? 'Time to work' : 'Break to rest'}
          </p>
          <Settings />
          {configPomodoro.routineMode
            ? targetCurrentTask.map(
                (task, index) =>
                  task.inFocus && (
                    <p
                      key={index}
                      className="max-w-[240px] truncate font-semibold
                  max-[540px]:max-w-[160px]"
                    >
                      <span className="font-bold">Focused:</span> #{index + 1}{' '}
                      {task.name}
                    </p>
                  ),
              )
            : tasks.map(
                (task, index) =>
                  task.inFocus && (
                    <p
                      key={index}
                      className="max-w-[240px] truncate font-semibold
                  max-[540px]:max-w-[160px]"
                    >
                      <span className="font-bold">Focused:</span> #{index + 1}{' '}
                      {task.name}
                    </p>
                  ),
              )}
        </div>
      </CircularProgressbarWithChildren>
    </div>
  );
};
