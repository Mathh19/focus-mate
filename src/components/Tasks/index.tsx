import { useContext, useState } from 'react';
import { DropdownMenuTasks } from './components/DropdownMenuTasks';
import { TasksContext } from '../../contexts/TasksContext/TasksContext';
import { TaskInput } from '../UI/TaskInput';
import { cleanInputSpaces } from '../../utils/cleanInputSpaces';
import { PomodoroContext } from '../../contexts/PomodoroContext/PomodoroContext';
import { getCurrentDayOfWeek } from '../../utils/getCurrentDayOfWeek';
import { DayProps, TaskProps } from '../../shared-types/tasks';
import { ContainerTaskItem } from './components/ContainerTaskItem';

export const Tasks = () => {
  const { tasks, addNewTask } = useContext(TasksContext);
  const { configPomodoro } = useContext(PomodoroContext);
  const [newTask, setNewTask] = useState<TaskProps>({
    name: '',
    finished: false,
  });
  const currentDay = getCurrentDayOfWeek();

  const handleSubmit = () => {
    if (newTask.name.trim() === '') return;
    const cleanTaskInput = cleanInputSpaces(newTask.name);
    configPomodoro.routineMode
      ? addNewTask({
          ...newTask,
          name: cleanTaskInput,
          day: currentDay as DayProps,
        })
      : addNewTask({ ...newTask, name: cleanTaskInput });
    setNewTask({ ...newTask, name: '', finished: false });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setNewTask({ ...newTask, name: value, finished: false });
  };

  const displayTasks = () => {
    if (configPomodoro.routineMode) {
      return tasks.filter((currentTask) => currentTask.day === currentDay);
    }
    return tasks.filter((tasks) => tasks.day === undefined);
  };

  const targetCurrentTask = displayTasks();

  return (
    <div className="w-full max-w-md space-y-4">
      <h2 className="flex items-center justify-between border-b-2 pb-2 text-5xl font-bold text-bluishPurple blueTheme:text-blueTheme dark:text-white max-[540px]:text-5xl">
        {!configPomodoro.routineMode ? 'Tasks' : `${currentDay}`}
        <DropdownMenuTasks />
      </h2>
      <div className="space-y-4">
        <ContainerTaskItem
          tasks={targetCurrentTask}
          shadowEffectColor="backgroundColor"
          dynamicHeight={true}
        />
        <div className="px-2">
          <TaskInput
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            newTask={newTask}
          />
        </div>
      </div>
    </div>
  );
};
