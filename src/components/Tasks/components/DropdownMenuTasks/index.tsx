import { useContext, useState } from 'react';
import { HiMenu, HiCheck } from 'react-icons/hi';
import { IoMdClose } from 'react-icons/io';
import { MdDelete } from 'react-icons/md';
import { VscClearAll } from 'react-icons/vsc';
import { PomodoroContext } from '../../../../contexts/PomodoroContext/PomodoroContext';
import { TasksContext } from '../../../../contexts/TasksContext/TasksContext';
import { alertWindow } from '../../../../utils/alertWindow';
import { TaskWeekOrganizer } from '../TaskWeekOrganizer';

export const DropdownMenuTasks = () => {
  const [open, setOpen] = useState(false);
  const { pomodoro } = useContext(PomodoroContext);
  const { tasks, deleteAllTasks, deleteAllFinishedTasks, doneAllTasks } =
    useContext(TasksContext);

  const handleCheckAllTasks = () => {
    doneAllTasks();
    setOpen(false);
  };

  const handleDeleteAllTask = () => {
    if (tasks.length > 0) {
      const alert = alertWindow('Do you really want to delete all your tasks?');
      alert && deleteAllTasks();
    }
    setOpen(false);
  };

  const handleDeleteAllFinishedTasks = () => {
    const tasksFinished = tasks.filter((task) => task.finished === true);
    if (tasksFinished.length > 0) {
      const alert = alertWindow(
        'Do you really want to delete all your completed tasks?',
      );
      alert && deleteAllFinishedTasks();
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
        <div className="absolute right-0 z-30 w-80 rounded-md bg-darkBlue p-2 text-2xl text-bluishPurple-dark blueTheme:text-blueTheme dark:bg-darkTheme-dark-grey dark:text-white">
          <div className="flex flex-col">
            {pomodoro.routineMode && <TaskWeekOrganizer />}
            <button onClick={handleCheckAllTasks} className="btn-dropdown">
              Check all tasks
              <HiCheck />
            </button>
            <button
              onClick={handleDeleteAllFinishedTasks}
              className="btn-dropdown"
            >
              Delete finished tasks
              <VscClearAll />
            </button>
            <button
              onClick={handleDeleteAllTask}
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
