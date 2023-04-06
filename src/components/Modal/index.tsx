import { useState, useContext } from 'react';
import { PomodoroContext } from '../../contexts/PomodoroContext';
import { ModalInput } from '../ModalInput';
import { ModalTitle } from '../ModalTitle';
import { IoSettingsSharp } from 'react-icons/io5';
import { RiTimerLine } from 'react-icons/ri';
import { BsSoundwave } from 'react-icons/bs';
import { VolumeSlider } from '../VolumeSlider';

export const Modal = () => {
  const { timer, setTimer } = useContext(PomodoroContext);
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
  };

  return (
    <div>
      <button
        onClick={() => setOpen(!open)}
        className="gap-2 px-2 py-1"
        aria-label="Settings"
        title="Settings"
      >
        <IoSettingsSharp className="h-9 w-9 fill-purplishGray transition duration-300 ease-in-out hover:-rotate-90" />
      </button>
      {open && (
        <div className="fixed inset-0 z-40 flex justify-center px-4">
          <form
            onSubmit={handleSubmit}
            className="relative z-50 my-6 w-full max-w-lg space-y-6 rounded-lg bg-darkBlue p-4 text-textColor/70"
          >
            <h2 className="mb-2 text-2xl font-bold uppercase">Settings</h2>
            <div>
              <ModalTitle>
                Time in minutes
                <RiTimerLine />
              </ModalTitle>
              <div className="mt-1 flex flex-wrap gap-8 max-[415px]:justify-between">
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
            <div>
              <ModalTitle>
                Sound
                <BsSoundwave className="h-7 w-7" />
              </ModalTitle>
              <div className="flex flex-col justify-start">
                <span className="mt-2 font-semibold">Volume:</span>
                <VolumeSlider />
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
