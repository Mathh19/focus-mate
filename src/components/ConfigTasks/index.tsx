import { useState, useContext } from 'react';
import { TasksContext } from '../../contexts/TasksContext/TasksContext';
import { ConfigTasksProps } from './types';
import { RiCloseLine } from 'react-icons/ri';
import { IoIosOptions } from 'react-icons/io';

export const ConfigTasks = ({ task }: ConfigTasksProps) => {
  const { tasks, updateTask, deleteTask } = useContext(TasksContext);
  const [open, setOpen] = useState(false);
  const [newTask, setNewTask] = useState(task);

  const getTask = () => {
    setOpen(true);
    const taskFound = tasks.find((element) => element === task);
    setNewTask(taskFound === undefined ? task : taskFound);
  };

  const handleEditTask = () => {
    updateTask(task, newTask);
    setOpen(false);
  };

  const handleDeleteTask = () => {
    deleteTask(task);
    setOpen(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    setNewTask((task) => ({ ...task, name: value }));
  };

  return (
    <div onClick={(e) => e.stopPropagation()}>
      <IoIosOptions className="cursor-pointer" onClick={getTask} />
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-50 flex min-h-screen cursor-pointer items-center justify-center bg-backgroundColor/50 p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-[420px] cursor-default rounded-md bg-darkGrayColor p-4"
          >
            <div className="space-y-10">
              <div className="flex justify-between border-b border-bluishGray pb-3">
                <h2>Config task</h2>
                <RiCloseLine
                  onClick={() => setOpen(false)}
                  className="cursor-pointer rounded-md border-[2px] border-bluishPurple text-3xl duration-200 ease-in-out hover:bg-bluishPurple"
                />
              </div>
              <label className="my-2 flex gap-2">
                Edit:
                <input
                  type="text"
                  value={newTask.name}
                  onChange={handleChange}
                  className="w-full rounded-md border-[2px] border-bluishGray bg-bluishGray px-2 outline-none focus:border-bluishPurple"
                />
              </label>
              <div className="flex w-full flex-wrap justify-between gap-2">
                <button
                  onClick={handleDeleteTask}
                  className="rounded-md bg-warningColor px-3 py-1"
                >
                  Delete
                </button>
                <button
                  onClick={handleEditTask}
                  className="rounded-md bg-bluishGray px-3 py-1"
                >
                  Edit
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
