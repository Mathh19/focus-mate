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
import { TaskInput } from '../TaskInput';
import { ButtonDropdown } from '../ButtonDropdown';

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
      <ButtonDropdown
        onClick={() => setOpen(true)}
        text="Add weekly tasks"
        icon={<VscExpandAll size={26} />}
      />
      <Modal.Root overflow={false} isOpen={open} setOpen={() => setOpen(false)}>
        <Modal.Header>
          <h2 className="text-4xl font-semibold text-skin-secondary-text">
            {days[countDay]}
          </h2>
          <button
            onClick={() => setOpen(false)}
            aria-label="Close modal"
            className="text-skin-primary-text hover:text-skin-secondary-text"
          >
            <IoMdClose size={28} />
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
            text="Prev"
            onClick={() => handlePrevOrNext('prev')}
            className="px-3 py-1 text-xl text-white"
          >
            Prev
          </Modal.Action>
          <Modal.Action
            text="Next"
            onClick={() => handlePrevOrNext('next')}
            className="px-3 py-1 text-xl text-white"
          />
        </Modal.Actions>
      </Modal.Root>
    </div>
  );
};
