import { useContext, useState } from 'react';
import { HiMenu, HiCheck } from 'react-icons/hi';
import { IoMdClose } from 'react-icons/io';
import { MdDelete } from 'react-icons/md';
import { VscClearAll } from 'react-icons/vsc';
import { PomodoroContext } from '../../../../contexts/PomodoroContext/PomodoroContext';
import { TasksContext } from '../../../../contexts/TasksContext/TasksContext';
import { alertWindow } from '../../../../utils/alertWindow';
import { TaskWeekOrganizer } from '../TaskWeekOrganizer';
import { ButtonDropdown } from '../ButtonDropdown';

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
        <div className="text-skin-primary absolute right-0 z-30 w-80 rounded-md bg-skin-modal-background p-2 text-2xl">
          <div className="flex flex-col">
            {pomodoro.routineMode && <TaskWeekOrganizer />}
            <ButtonDropdown
              onClick={handleCheckAllTasks}
              text="Check all tasks"
              icon={<HiCheck size={26} />}
            />
            <ButtonDropdown
              onClick={handleDeleteAllFinishedTasks}
              text="Delete finished tasks"
              icon={<VscClearAll size={26} />}
            />
            <ButtonDropdown
              onClick={handleDeleteAllTask}
              danger
              text="Delete all tasks"
              icon={<MdDelete size={26} />}
            />
          </div>
        </div>
      )}
    </div>
  );
};
