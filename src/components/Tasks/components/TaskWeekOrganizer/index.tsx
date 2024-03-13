import { useState, useContext } from 'react';
import { VscExpandAll } from 'react-icons/vsc';
import { IoMdClose } from 'react-icons/io';
import { v4 as uuidv4 } from 'uuid';
import { TasksContext } from '../../../../contexts/TasksContext/TasksContext';
import { cleanInputSpaces } from '../../../../utils/cleanInputSpaces';
import { getCurrentDayOfWeek } from '../../../../utils/getCurrentDayOfWeek';
import { DayProps } from '../../../../shared-types/tasks';
import { ContainerTaskItem } from '../ContainerTaskItem';
import { Modal } from '../../../UI/Modal';
import { TaskInput } from '../../../UI/TaskInput';

const days = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];

export const TaskWeekOrganizer = () => {
  const { tasks, addNewTask } = useContext(TasksContext);
  const [open, setOpen] = useState(false);
  const [newTask, setNewTask] = useState({
    _id: uuidv4(),
    name: '',
    finished: false,
  });
  const today = getCurrentDayOfWeek();
  const findIndexDay = days.findIndex((element) => element === today);
  const [countDay, setCountDay] = useState(findIndexDay);

  const handleSubmit = () => {
    if (newTask.name.trim() === '') return;
    const cleanTacustomput = cleanInputSpaces(newTask.name);
    setNewTask({ ...newTask, name: '', finished: false });
    addNewTask({
      ...newTask,
      name: cleanTacustomput,
      day: days[countDay] as DayProps,
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setNewTask({ ...newTask, name: value, finished: false });
  };

  const handlePrevOrNext = (state: 'prev' | 'next') => {
    if (state === 'prev') {
      setCountDay((prevState) => (prevState === 0 ? 6 : prevState - 1));
    } else {
      setCountDay((prevState) => (prevState === 6 ? 0 : prevState + 1));
    }
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
      <Modal.Root overflow={false} isOpen={open} setOpen={() => setOpen(false)}>
        <Modal.Header>
          <h2 className="text-skin-primary-text">
            Add your tasks for{' '}
            <span className="text-skin-secondary-text">{days[countDay]}</span>
          </h2>
          <button
            onClick={() => setOpen(false)}
            aria-label="Close modal"
            className="text-skin-primary-text hover:text-skin-secondary-text"
          >
            <IoMdClose />
          </button>
        </Modal.Header>
        <Modal.Content>
          <div className="w-full text-skin-primary-text">
            <ContainerTaskItem
              tasks={targetCurrentTask}
              shadowEffectColor="skin-modal-bakcground"
              dynamicHeight={false}
            />
            <TaskInput
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              newTask={newTask}
            />
          </div>
        </Modal.Content>
        <Modal.Actions>
          <Modal.Action
            onClick={() => handlePrevOrNext('prev')}
            className="px-4 py-2"
          >
            Prev
          </Modal.Action>
          <Modal.Action
            onClick={() => handlePrevOrNext('next')}
            className="px-4 py-2"
          >
            Next
          </Modal.Action>
        </Modal.Actions>
      </Modal.Root>
    </div>
  );
};
