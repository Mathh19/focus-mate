import { useState, useContext, useRef, useEffect } from 'react';
import { VscExpandAll } from 'react-icons/vsc';
import { IoMdClose } from 'react-icons/io';
import { TaskInput } from '../TaskInput';
import { TasksContext } from '../../contexts/TasksContext/TasksContext';
import { cleanInputSpaces } from '../../utils/cleanInputSpaces';
import { TaskItem } from '../TaskItem';
import { TaskWeekOrganizerProps } from './types';
import { getCurrentDayOfWeek } from '../../utils/getCurrentDayOfWeek';
import { DayProps } from '../../shared-types/tasks';

export const TaskWeekOrganizer = ({
  isDropdownOpen,
}: TaskWeekOrganizerProps) => {
  const { tasks, addNewTask } = useContext(TasksContext);
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
  const today = getCurrentDayOfWeek();
  const findIndexDay = days.findIndex((element) => element === today);
  const [countDay, setCountDay] = useState(findIndexDay);

  const handleScroll = () => {
    const ulElement = ulRef.current;
    if (ulElement) {
      setIsScrolledToTop(ulElement.scrollTop === 0);
    }
  };

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
      countDay === 0
        ? setCountDay(6)
        : setCountDay((prevState) => prevState - 1);
    } else {
      countDay === 6
        ? setCountDay(0)
        : setCountDay((prevState) => prevState + 1);
    }
  };

  const handleClose = (e: React.MouseEvent<SVGElement>) => {
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
  }, [ulRef.current?.clientHeight, countDay]);

  const targetCurrentTask = tasks.filter(
    (currentTask) => currentTask.day === days[countDay],
  );

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
              <ul
                ref={ulRef}
                className={`relative mb-4 max-h-[289px] min-h-[288px] space-y-3 overflow-auto ${
                  hasScroll &&
                  isScrolledToTop &&
                  "after:pointer-events-none after:absolute after:bottom-0 after:h-4 after:w-full after:animate-fade-in-slowly after:bg-gradient-to-t after:from-darkGray after:to-transparent after:content-[''] after:dark:from-darkTheme-950"
                }`}
              >
                {targetCurrentTask.map((task, index) => (
                  <TaskItem key={index} task={task} />
                ))}
              </ul>
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
