import { useContext, useState } from 'react';
import { AnimatedCheck } from '../AnimatedCheck';
import { DropdownMenuTasks } from '../DropdownMenuTasks';
import { TasksContext } from '../../contexts/TasksContext/TasksContext';
import { ConfigTasks } from '../ConfigTasks';
import { TaskProps } from '../../contexts/TasksContext/types';
import { MdOutlinePostAdd } from 'react-icons/md';

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

  const handleWorking = (task: TaskProps) => {
    setWorkingTask(task, true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setNewTask({ name: value, finished: false });
  };

  return (
    <div className="mt-9 w-full max-w-md space-y-2 px-3">
      <h2 className="flex items-center justify-between border-b-2 pb-2 text-6xl font-bold text-bluishPurple max-[540px]:text-5xl">
        Tasks
        <DropdownMenuTasks />
      </h2>
      <ul className="flex flex-col gap-2 overflow-auto p-2 text-2xl font-semibold">
        {tasks.map((task, index) => (
          <li
            key={index}
            onClick={() => handleWorking(task)}
            className="flex cursor-pointer items-center justify-between gap-1 rounded-md bg-bluishPurple py-2 px-3 hover:bg-bluishPurple-dark"
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
          <label className="t flex w-full items-center justify-between gap-1 rounded-md border-4 border-dashed border-bluishPurple/60 bg-none p-2 text-textColor/50 transition duration-200 ease-in-out focus-within:border-bluishPurple focus-within:text-textColor hover:border-bluishPurple  hover:text-textColor">
            <input
              type="text"
              value={newTask.name}
              placeholder="Add a task..."
              className="w-full bg-[transparent] outline-none"
              onChange={handleChange}
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
