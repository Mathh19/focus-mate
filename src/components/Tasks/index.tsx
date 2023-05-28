import { useContext, useState } from 'react';
import { MdOutlinePostAdd } from 'react-icons/md';
import { AnimatedCheck } from '../AnimatedCheck';
import { DropdownMenuTasks } from '../DropdownMenuTasks';
import { TasksContext } from '../../contexts/TasksContext/TasksContext';
import { ConfigTasks } from '../ConfigTasks';
import { TaskProps } from '../../contexts/TasksContext/types';

export const Tasks = () => {
  const { tasks, addNewTask, setWorkingTask } = useContext(TasksContext);
  const [newTask, setNewTask] = useState<TaskProps>({
    name: '',
    finished: false,
  });

  const handleSubmit = () => {
    if (newTask.name === '') return;
    addNewTask(newTask);
    setNewTask({ name: '', finished: false });
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSubmit();
    }
  };

  const handleWorking = (task: TaskProps) => {
    setWorkingTask(task, true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setNewTask({ name: value, finished: false });
  };

  return (
    <div className="w-full max-w-md space-y-2">
      <h2 className="flex items-center justify-between border-b-2 pb-2 text-6xl font-bold text-bluishPurple blueTheme:text-blueTheme dark:text-white max-[540px]:text-5xl">
        Tasks
        <DropdownMenuTasks />
      </h2>
      <ul className="flex flex-col gap-2 p-2 text-2xl font-semibold">
        {tasks.map((task, index) => (
          <li
            key={index}
            onClick={() => handleWorking(task)}
            className="flex cursor-pointer items-center justify-between gap-1 rounded-md bg-bluishPurple px-3 py-2 hover:bg-bluishPurple-dark blueTheme:bg-blueTheme blueTheme:hover:bg-blueTheme-dark dark:bg-darkTheme dark:hover:bg-darkTheme-dark"
          >
            <p className={`truncate ${task.finished && 'line-through'}`}>
              {task.name}
            </p>
            <div className="flex gap-2">
              <AnimatedCheck task={task} />
              <ConfigTasks task={task} />
            </div>
          </li>
        ))}
        <li>
          <label className="flex w-full items-center justify-between gap-1 rounded-md border-4 border-dashed border-bluishPurple/60 bg-none p-2 text-white/50 transition duration-200 ease-in-out focus-within:border-bluishPurple focus-within:text-white hover:border-bluishPurple hover:text-white blueTheme:border-blueTheme/60 blueTheme:focus-within:border-blueTheme blueTheme:hover:border-blueTheme dark:border-darkTheme/60 dark:focus-within:border-white dark:hover:border-white">
            <input
              type="text"
              value={newTask.name}
              placeholder="Add a task..."
              className="w-full bg-transparent outline-none"
              onChange={handleChange}
              onKeyDown={handleKeyDown}
            />
            <MdOutlinePostAdd
              className="cursor-pointer text-4xl"
              onClick={handleSubmit}
            />
          </label>
        </li>
      </ul>
    </div>
  );
};
