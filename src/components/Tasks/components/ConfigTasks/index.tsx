import { useState, useContext } from 'react';
import { RiCloseLine } from 'react-icons/ri';
import { IoIosOptions } from 'react-icons/io';
import { TasksContext } from '../../../../contexts/TasksContext/TasksContext';
import { ConfigTasksProps } from './types';
import { alertWindow } from '../../../../utils/alertWindow';
import { cleanInputSpaces } from '../../../../utils/cleanInputSpaces';
import { Modal } from '../../../UI/Modal';

export const ConfigTasks = ({ task }: ConfigTasksProps) => {
  const { tasks, updateTask, deleteTask } = useContext(TasksContext);
  const [open, setOpen] = useState(false);
  const [newTask, setNewTask] = useState(task);
  const [isEmpty, setIsEmpty] = useState(false);

  const openConfig = () => {
    setOpen(true);
    const taskFound = tasks.find((element) => element === task);
    setNewTask(taskFound ?? task);
  };

  const handleEditTask = () => {
    if (newTask.name.trim() === '') {
      setIsEmpty(true);
      return;
    }
    setIsEmpty(false);

    const cleanTaskInput = cleanInputSpaces(newTask.name);

    updateTask(task, { ...newTask, name: cleanTaskInput });
    document.body.style.overflow = 'unset';
    setOpen(false);
  };

  const handleDeleteTask = () => {
    const alert = alertWindow(
      `Do you really want to delete the "${task.name}" task ?`,
    );
    alert && deleteTask(task);
    document.body.style.overflow = 'unset';
    setOpen(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;
    if (value.trim() !== '') setIsEmpty(false);

    setNewTask((task) => ({ ...task, name: value }));
  };

  const handleClose = () => {
    setOpen(false);
    setIsEmpty(false);
  };

  return (
    <div>
      <IoIosOptions className="cursor-pointer" onClick={openConfig} />
      <Modal.Root isOpen={open} setOpen={() => setOpen(false)}>
        <Modal.Header>
          <h2>Config task</h2>
          <button
            onClick={handleClose}
            className="rounded-md border-[2px] border-bluishPurple text-3xl duration-200 ease-in-out hover:bg-bluishPurple blueTheme:border-blueTheme blueTheme:hover:bg-blueTheme dark:border-darkTheme-grey dark:hover:bg-darkTheme-grey"
          >
            <RiCloseLine />
          </button>
        </Modal.Header>
        <Modal.Content>
          <div className="flex w-full flex-col">
            <div className="flex items-center gap-4">
              Edit:
              <textarea
                id="edit-task"
                placeholder="Edit your task..."
                value={newTask.name}
                onChange={handleChange}
                className="w-full rounded-md border-[2px] border-bluishGray bg-bluishGray px-2 outline-none focus:border-bluishPurple blueTheme:focus:border-blueTheme dark:bg-darkTheme-grey dark:focus:border-white"
              />
            </div>
            {isEmpty && (
              <span className="animate-earthquake text-dangerColor">
                Task field is empty!
              </span>
            )}
          </div>
        </Modal.Content>
        <Modal.Actions>
          <Modal.Action danger onClick={handleDeleteTask}>
            Delete
          </Modal.Action>
          <Modal.Action onClick={handleEditTask}>Edit</Modal.Action>
        </Modal.Actions>
      </Modal.Root>
    </div>
  );
};
