import { useState } from 'react';
import { BsQuestionCircle } from 'react-icons/bs';
import { about } from '../../content/about.json';
import { Modal } from '../UI/Modal';

export const About = () => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <div>
        <button
          onClick={() => setOpen(true)}
          className="gap-2 px-2 py-1"
          aria-label="A button to open a modal"
        >
          <BsQuestionCircle className="text-3xl transition duration-200 ease-in-out hover:text-bluishPurple focus:text-bluishPurple blueTheme:hover:text-blueTheme blueTheme:focus:text-blueTheme dark:hover:text-white dark:focus:text-white" />
        </button>
        <Modal.Root isOpen={open} setOpen={() => setOpen(!open)}>
          <Modal.Content>
            <div
              onClick={() => setOpen(false)}
              className="flex max-w-[450px] flex-col items-center justify-center gap-2  text-center"
            >
              <BsQuestionCircle className="text-7xl text-bluishPurple blueTheme:text-blueTheme dark:text-white max-[432px]:min-h-[72px] max-[432px]:min-w-[72px]" />
              <h2 className="text-3xl font-bold text-bluishPurple blueTheme:text-blueTheme dark:text-white">
                What is the Pomodoro ?
              </h2>
              <p className="text-lg font-semibold">{about}</p>
            </div>
          </Modal.Content>
        </Modal.Root>
      </div>
    </div>
  );
};
