import { useState, useContext } from 'react';
import { TimerContext } from '../../contexts/TimerContext';
import { ModalInput } from '../ModalInput';
import { IoSettingsSharp } from 'react-icons/io5';
import { RiTimerLine } from 'react-icons/ri';

export const Modal = () => {
  const { timer, setTimer } = useContext(TimerContext);
  const [open, setOpen] = useState(false);
  const [newTimer, setNewTimer] = useState({
    ...timer,
  });

  const displayInMinutes = (num: number) => {
    const min = num / 60;
    return `${min}`;
  };

  const convertInSeconds = (timer: number) => {
    const sec = timer * 60;
    return sec;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setTimer(newTimer);
    setOpen(false);
  };

  const handleTimerInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewTimer((prevTimer) => ({
      ...prevTimer,
      [name]: convertInSeconds(parseInt(value)),
    }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewTimer((prevTimer) => ({
      ...prevTimer,
      [name]: parseInt(value),
    }));
  };

  const handleCloseModal = () => {
    setOpen(false);
    return;
  };

  return (
    <div>
      <button onClick={() => setOpen(!open)} className="gap-2 px-2 py-1">
        <IoSettingsSharp className="h-7 w-7 fill-purplishGray transition duration-300 ease-in-out hover:-rotate-90" />
      </button>
      {open && (
        <div className="absolute top-0 right-0 left-0 bottom-0 z-40 flex justify-center">
          <form
            onSubmit={handleSubmit}
            className="relative my-6 w-full max-w-lg rounded-lg bg-darkBlue p-4 text-textColor/70"
          >
            <h2 className="pb-4 text-lg font-bold uppercase">Settings</h2>
            <div>
              <div className="mb-1 flex items-center gap-1 text-xl font-semibold">
                Time in minutes
                <RiTimerLine />
              </div>
              <div className="flex gap-7">
                <ModalInput
                  onChange={handleTimerInputChange}
                  labelText="Pomodoro:"
                  name="pomodoroTime"
                  type="number"
                  defaultValue={displayInMinutes(timer.pomodoroTime)}
                />
                <ModalInput
                  onChange={handleTimerInputChange}
                  labelText="Short Break:"
                  name="shortRestTime"
                  type="number"
                  defaultValue={displayInMinutes(timer.shortRestTime)}
                />
                <ModalInput
                  onChange={handleTimerInputChange}
                  labelText="Long Break:"
                  name="longRestTime"
                  type="number"
                  defaultValue={displayInMinutes(timer.longRestTime)}
                />
                <ModalInput
                  onChange={handleInputChange}
                  labelText="Cycles:"
                  name="cycles"
                  type="number"
                  defaultValue={timer.cycles}
                />
              </div>
            </div>
            <div className="absolute bottom-0 left-0 flex w-full justify-between p-4 text-xl font-semibold">
              <button
                type="button"
                onClick={handleCloseModal}
                className="rounded-lg bg-tealBlue p-2 text-bluishPurple/70 transition ease-in-out"
              >
                cancel
              </button>
              <button type="submit">apply</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
