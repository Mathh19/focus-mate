import { useState, useContext } from 'react';
import { RiCloseLine } from 'react-icons/ri';
import { IoIosOptions } from 'react-icons/io';
import { TasksContext } from '../../../../contexts/TasksContext/TasksContext';
import { ConfigTasksProps } from './types';
import { alertWindow } from '../../../../utils/alertWindow';
import { cleanInputSpaces } from '../../../../utils/cleanInputSpaces';
import { Modal } from '../../../UI/Modal';
import { Button } from '../../../UI/Button';

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

    const cleanTacustomput = cleanInputSpaces(newTask.name);

    updateTask(task, { ...newTask, name: cleanTacustomput });
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
          <Button
            onClick={handleClose}
            icon={<RiCloseLine size={28} />}
            className="rounded-md border-2 border-skin-border-primary bg-transparent p-0 hover:border-skin-button-hover active:border-skin-button-active"
          />
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
                className="w-full rounded-md border-[2px] border-skin-base bg-skin-input-primary px-2 outline-none focus:border-skin-base"
              />
            </div>
            {isEmpty && (
              <span className="animate-earthquake text-red-600">
                Task field is empty!
              </span>
            )}
          </div>
        </Modal.Content>
        <Modal.Actions>
          <Modal.Action danger onClick={handleDeleteTask} text="Delete" />
          <Modal.Action onClick={handleEditTask} text="Edit" />
        </Modal.Actions>
      </Modal.Root>
    </div>
  );
};
