import { useState, useContext, useRef, useEffect } from 'react';
import { SlArrowLeft, SlArrowRight } from 'react-icons/sl';
import { VscExpandAll } from 'react-icons/vsc';
import { TaskInput } from '../TaskInput';
import { TasksContext } from '../../contexts/TasksContext/TasksContext';
import { cleanInputSpaces } from '../../utils/cleanInputSpaces';
import { TaskItem } from '../TaskItem';
import { TaskWeekOrganizerProps } from './types';

export const TaskWeekOrganizer = ({
  isDropdownOpen,
}: TaskWeekOrganizerProps) => {
  const { weeklyTasks, addWeeklyTasks } = useContext(TasksContext);
  const [open, setOpen] = useState(false);
  const [newTask, setNewTask] = useState({
    name: '',
    finished: false,
  });
  const ulRef = useRef<HTMLUListElement>(null);
  const [isScrolledToTop, setIsScrolledToTop] = useState(true);
  const [hasScroll, setHasScroll] = useState(false);
  const days = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ];
  const [countDay, setCountDay] = useState(0);

  const handleScroll = () => {
    const ulElement = ulRef.current;
    if (ulElement) {
      setIsScrolledToTop(ulElement.scrollTop === 0);
    }
  };

  const handleSubmit = () => {
    if (newTask.name.trim() === '') return;
    const cleanTaskInput = cleanInputSpaces(newTask.name);
    setNewTask({ name: '', finished: false });
    weeklyTasks[countDay].tasks.push({ ...newTask, name: cleanTaskInput });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setNewTask({ name: value, finished: false });
  };

  const handlePrevOrNext = (
    e: React.MouseEvent<HTMLButtonElement>,
    state: 'prev' | 'next',
  ) => {
    e.preventDefault();
    if (state === 'prev') {
      if (countDay === 0) return;
      setCountDay((prevState) => prevState - 1);
    } else {
      if (countDay === 6) return;
      setCountDay((prevState) => prevState + 1);
    }
  };

  const handleConfirm = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    addWeeklyTasks(weeklyTasks);
    setOpen(false);
    isDropdownOpen(false);
  };

  const handleCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setOpen(false);
    isDropdownOpen(false);
  };

  useEffect(() => {
    const ulElement = ulRef.current;
    if (ulElement) {
      ulElement.addEventListener('scroll', handleScroll);
      ulElement.clientHeight < 289 ? setHasScroll(false) : setHasScroll(true);
      return () => ulElement.removeEventListener('scroll', handleScroll);
    }
  }, [ulRef.current?.clientHeight]);

  return (
    <div>
      <button className="btn-dropdown w-full" onClick={() => setOpen(true)}>
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
            <div className="flex w-full justify-between border-b-2 border-bluishGray px-4 pb-4">
              <h2 className="text-4xl font-semibold">
                Add your tasks for{' '}
                <span className="text-bluishPurple blueTheme:text-blueTheme dark:text-darkTheme">
                  {days[countDay]}
                </span>
              </h2>
            </div>
            <div className="w-full max-w-lg px-4">
              <ul
                ref={ulRef}
                className={`relative mb-4 max-h-[289px] space-y-3 overflow-auto ${
                  hasScroll &&
                  isScrolledToTop &&
                  "after:pointer-events-none after:absolute after:bottom-0 after:h-4 after:w-full after:animate-fade-in-slowly after:bg-gradient-to-t after:from-darkGray after:to-transparent after:content-[''] after:dark:from-darkTheme-950"
                }`}
              >
                {weeklyTasks[countDay].tasks.map((task, index) => (
                  <TaskItem key={index} task={task} />
                ))}
              </ul>
              <TaskInput
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                newTask={newTask}
              />
            </div>
            <div className="flex w-full items-center justify-between gap-2 px-4 text-xl font-semibold text-bluishPurple blueTheme:text-blueTheme dark:text-white">
              <button
                onClick={handleCancel}
                className="w-full max-w-[122px] rounded-md bg-tealBlue px-1 py-2 dark:bg-darkTheme-600"
              >
                Cancel
              </button>
              <div className="flex gap-2">
                <button
                  onClick={(e) => handlePrevOrNext(e, 'prev')}
                  className="rounded-md bg-tealBlue px-3 py-2 dark:bg-darkTheme-600"
                >
                  <SlArrowLeft />
                </button>
                <button
                  onClick={(e) => handlePrevOrNext(e, 'next')}
                  className="rounded-md bg-tealBlue px-3 py-2 dark:bg-darkTheme-600"
                >
                  <SlArrowRight />
                </button>
              </div>
              <button
                onClick={handleConfirm}
                className="w-full max-w-[122px] rounded-md bg-tealBlue px-1 py-2 dark:bg-darkTheme-600"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
