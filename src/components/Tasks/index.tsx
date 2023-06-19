import { useContext, useState } from 'react';
import { DropdownMenuTasks } from '../DropdownMenuTasks';
import { TasksContext } from '../../contexts/TasksContext/TasksContext';
import { TaskItem } from '../TaskItem';
import { TaskInput } from '../TaskInput';
import { cleanInputSpaces } from '../../utils/cleanInputSpaces';
import { PomodoroContext } from '../../contexts/PomodoroContext/PomodoroContext';
import { getCurrentDayOfWeek } from '../../utils/getCurrentDayOfWeek';
import { TaskProps } from '../../shared-types/tasks';

export const Tasks = () => {
  const { tasks, weeklyTasks, addNewTask } = useContext(TasksContext);
  const { configPomodoro } = useContext(PomodoroContext);
  const [newTask, setNewTask] = useState<TaskProps>({
    name: '',
    finished: false,
  });
  const currentDay = getCurrentDayOfWeek();

  const handleSubmit = () => {
    if (newTask.name.trim() === '') return;
    const cleanTaskInput = cleanInputSpaces(newTask.name);
    addNewTask({ ...newTask, name: cleanTaskInput });
    setNewTask({ name: '', finished: false });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setNewTask({ name: value, finished: false });
  };

  const targetCurrentTask = weeklyTasks.find(
    (currentTask) => currentTask.day === currentDay,
  );

  return (
    <div className="w-full max-w-md space-y-2">
      <h2 className="flex items-center justify-between border-b-2 pb-2 text-5xl font-bold text-bluishPurple blueTheme:text-blueTheme dark:text-white max-[540px]:text-5xl">
        {!configPomodoro.weeklyTasksMode ? 'Tasks' : `${currentDay}`}
        <DropdownMenuTasks />
      </h2>
      <ul className="flex flex-col gap-2 p-2">
        {configPomodoro.weeklyTasksMode
          ? targetCurrentTask?.tasks.map((task, index) => (
              <TaskItem key={index} task={task} />
            ))
          : tasks.map((task, index) => <TaskItem key={index} task={task} />)}
        <li>
          <TaskInput
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            newTask={newTask}
          />
        </li>
      </ul>
    </div>
  );
};
