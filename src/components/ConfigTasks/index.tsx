import { useState, useContext } from 'react';
import { RiCloseLine } from 'react-icons/ri';
import { IoIosOptions } from 'react-icons/io';
import { TasksContext } from '../../contexts/TasksContext/TasksContext';
import { ConfigTasksProps } from './types';
import { alertWindow } from '../../utils/alertWindow';
import { cleanInputSpaces } from '../../utils/cleanInputSpaces';

export const ConfigTasks = ({ task }: ConfigTasksProps) => {
  const { tasks, updateTask, deleteTask } = useContext(TasksContext);
  const [open, setOpen] = useState(false);
  const [newTask, setNewTask] = useState(task);
  const [isEmpty, setIsEmpty] = useState(false);

  const getTask = () => {
    setOpen(true);
    const taskFound = tasks.find((element) => element === task);
    setNewTask(taskFound === undefined ? task : taskFound);
  };

  const handleEditTask = () => {
    if (newTask.name.trim() === '') {
      setIsEmpty(true);
      return;
    }
    setIsEmpty(false);

    const cleanTaskInput = cleanInputSpaces(newTask.name);

    updateTask(task, { ...newTask, name: cleanTaskInput });
    setOpen(false);
  };

  const handleDeleteTask = () => {
    const alert = alertWindow(
      `Do you really want to delete the "${task.name}" task?`,
    );
    alert && deleteTask(task);
    setOpen(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (value.trim() !== '') setIsEmpty(false);

    setNewTask((task) => ({ ...task, name: value }));
  };

  const handleClose = () => {
    setOpen(false);
    setIsEmpty(false);
  };

  return (
    <div onClick={(e) => e.stopPropagation()}>
      <IoIosOptions className="cursor-pointer" onClick={getTask} />
      {open && (
        <div
          onClick={handleClose}
          className="fixed inset-0 z-50 flex min-h-screen cursor-pointer items-center justify-center bg-backgroundColor/50 p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-[420px] cursor-default rounded-md bg-darkGray p-4 dark:bg-darkTheme-950"
          >
            <div className="space-y-10">
              <div className="flex justify-between border-b border-bluishGray pb-3">
                <h2>Config task</h2>
                <RiCloseLine
                  onClick={handleClose}
                  className="cursor-pointer rounded-md border-[2px] border-bluishPurple text-3xl duration-200 ease-in-out hover:bg-bluishPurple blueTheme:border-blueTheme blueTheme:hover:bg-blueTheme dark:border-darkTheme dark:hover:bg-darkTheme"
                />
              </div>
              <div className="flex flex-col">
                <label className="my-2 flex gap-2">
                  Edit:
                  <input
                    type="text"
                    value={newTask.name}
                    onChange={handleChange}
                    className="w-full rounded-md border-[2px] border-bluishGray bg-bluishGray px-2 outline-none focus:border-bluishPurple blueTheme:focus:border-blueTheme dark:focus:border-white"
                  />
                </label>
                {isEmpty && (
                  <span className="animate-earthquake text-dangerColor">
                    Task field is empty!
                  </span>
                )}
              </div>
              <div className="flex w-full flex-wrap justify-between gap-2">
                <button
                  onClick={handleDeleteTask}
                  className="rounded-md bg-dangerColor px-3 py-1"
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
