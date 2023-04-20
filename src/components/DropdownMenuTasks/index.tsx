import { useContext, useState } from 'react';
import { TasksContext } from '../../contexts/TasksContext/TasksContext';
import { HiMenu, HiCheck } from 'react-icons/hi';
import { IoMdClose } from 'react-icons/io';
import { MdDelete } from 'react-icons/md';
import { VscClearAll } from 'react-icons/vsc';

export const DropdownMenuTasks = () => {
  const [open, setOpen] = useState(false);
  const { tasks, deleteTask, setFinished } = useContext(TasksContext);

  const handleClick = (fn: () => void) => {
    fn();
    setOpen(false);
  };

  const handleClickDeleteAllTask = () => {
    if (tasks.length > 0) {
      const alert = window.confirm(
        'Do you really want to delete all your tasks?',
      );
      alert && deleteTask();
      setOpen(false);
    }
    setOpen(false);
  };

  return (
    <div className="relative text-4xl">
      {!open ? (
        <HiMenu onClick={() => setOpen(!open)} className="cursor-pointer" />
      ) : (
        <IoMdClose onClick={() => setOpen(!open)} className="cursor-pointer" />
      )}
      {open && (
        <div className="absolute right-0 z-50 w-80 rounded-md bg-darkBlue p-2 text-2xl text-bluishPurple-dark">
          <div className="flex flex-col">
            <button
              onClick={() => handleClick(() => setFinished(true))}
              className="flex items-center justify-between rounded-md px-2 py-1 duration-200 ease-in hover:bg-bluishPurple-dark hover:text-white"
            >
              Check all tasks
              <HiCheck />
            </button>
            <button
              onClick={() => handleClick(() => deleteTask(undefined, true))}
              className="flex items-center justify-between rounded-md px-2 py-1 duration-200 ease-in hover:bg-bluishPurple-dark hover:text-white"
            >
              Delete finished tasks
              <VscClearAll />
            </button>
            <button
              onClick={handleClickDeleteAllTask}
              className="flex items-center justify-between rounded-md px-2 py-1 duration-200 ease-in hover:bg-dangerColor hover:text-white"
            >
              Delete all tasks
              <MdDelete />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
