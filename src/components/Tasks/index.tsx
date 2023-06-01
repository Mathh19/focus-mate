import { useContext, useState } from 'react';
import { DropdownMenuTasks } from '../DropdownMenuTasks';
import { TasksContext } from '../../contexts/TasksContext/TasksContext';
import { TaskProps } from '../../contexts/TasksContext/types';
import { TaskItem } from '../TaskItem';
import { TaskInput } from '../TaskInput';

export const Tasks = () => {
  const { tasks, addNewTask, setWorkingTask } = useContext(TasksContext);
  const [newTask, setNewTask] = useState<TaskProps>({
    name: '',
    finished: false,
  });

  const handleSubmit = () => {
    if (newTask.name.trim() === '') return;
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
    <div className="w-full max-w-md space-y-2">
      <h2 className="flex items-center justify-between border-b-2 pb-2 text-6xl font-bold text-bluishPurple blueTheme:text-blueTheme dark:text-white max-[540px]:text-5xl">
        Tasks
        <DropdownMenuTasks />
      </h2>
      <ul className="flex flex-col gap-2 p-2 text-2xl font-semibold">
        {tasks.map((task, index) => (
          <TaskItem key={index} task={task} handleWorking={handleWorking} />
        ))}
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
