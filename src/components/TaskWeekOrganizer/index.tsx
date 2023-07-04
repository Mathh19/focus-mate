import { useState, useContext } from 'react';
import { VscExpandAll } from 'react-icons/vsc';
import { IoMdClose } from 'react-icons/io';
import { TaskInput } from '../TaskInput';
import { TasksContext } from '../../contexts/TasksContext/TasksContext';
import { cleanInputSpaces } from '../../utils/cleanInputSpaces';
import { TaskWeekOrganizerProps } from './types';
import { getCurrentDayOfWeek } from '../../utils/getCurrentDayOfWeek';
import { DayProps } from '../../shared-types/tasks';
import { ContainerTaskItem } from '../ContainerTaskItem';

const days = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];

export const TaskWeekOrganizer = ({
  isDropdownOpen,
}: TaskWeekOrganizerProps) => {
  const { tasks, addNewTask } = useContext(TasksContext);
  const [open, setOpen] = useState(false);
  const [newTask, setNewTask] = useState({
    name: '',
    finished: false,
  });
  const today = getCurrentDayOfWeek();
  const findIndexDay = days.findIndex((element) => element === today);
  const [countDay, setCountDay] = useState(findIndexDay);

  const handleSubmit = () => {
    if (newTask.name.trim() === '') return;
    const cleanTaskInput = cleanInputSpaces(newTask.name);
    setNewTask({ ...newTask, name: '', finished: false });
    addNewTask({
      ...newTask,
      name: cleanTaskInput,
      day: days[countDay] as DayProps,
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setNewTask({ ...newTask, name: value, finished: false });
  };

  const handlePrevOrNext = (
    e: React.MouseEvent<HTMLButtonElement>,
    state: 'prev' | 'next',
  ) => {
    e.preventDefault();
    if (state === 'prev') {
      setCountDay((prevState) => (prevState === 0 ? 6 : prevState - 1));
    } else {
      setCountDay((prevState) => (prevState === 6 ? 0 : prevState + 1));
    }
  };

  const handleClose = (e: React.MouseEvent<SVGElement>) => {
    e.preventDefault();
    setOpen(false);
    isDropdownOpen(false);
  };

  const targetCurrentTask = tasks.filter(
    (currentTask) => currentTask.day === days[countDay],
  );

  return (
    <div>
      <button
        onClick={() => setOpen(true)}
        aria-label="Add weekly tasks"
        className="btn-dropdown w-full"
      >
        Add weekly tasks
        <VscExpandAll />
      </button>
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-backgroundColor/60"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="mx-4 flex w-full max-w-[826px] flex-col items-center space-y-6 rounded-3xl border border-white bg-darkGray py-6 text-white dark:bg-darkTheme-950"
          >
            <div className="flex w-full items-center justify-between border-b-2 border-bluishGray px-4 pb-4 text-4xl font-semibold">
              <h2>
                Add your tasks for{' '}
                <span className="text-bluishPurple blueTheme:text-blueTheme dark:text-darkTheme">
                  {days[countDay]}
                </span>
              </h2>
              <span>
                <IoMdClose
                  onClick={handleClose}
                  className="cursor-pointer hover:text-bluishPurple blueTheme:hover:text-blueTheme dark:hover:text-darkTheme"
                />
              </span>
            </div>
            <div className="w-full max-w-lg px-4">
              <ContainerTaskItem
                tasks={targetCurrentTask}
                shadowEffectColor="darkGray"
                dynamicHeight={false}
              />
              <TaskInput
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                newTask={newTask}
              />
            </div>
            <div className="flex w-full max-w-lg justify-between px-4 text-xl font-semibold text-bluishPurple blueTheme:text-blueTheme dark:text-white">
              <button
                onClick={(e) => handlePrevOrNext(e, 'prev')}
                className="rounded-md bg-tealBlue px-4 py-2 dark:bg-darkTheme-600"
              >
                Prev
              </button>
              <button
                onClick={(e) => handlePrevOrNext(e, 'next')}
                className="rounded-md bg-tealBlue px-4 py-2 dark:bg-darkTheme-600"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
