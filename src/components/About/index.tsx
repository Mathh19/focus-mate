import { useState } from 'react';
import { BsQuestionCircle } from 'react-icons/bs';
import { about } from '../../content/about.json';
import { Modal } from '../UI/Modal';
import { Button } from '../UI/Button';

export const About = () => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <div>
        <Button
          onClick={() => setOpen(true)}
          aria-label="A button to open a modal"
          icon={<BsQuestionCircle size={28} />}
          className="rounded-full bg-transparent p-2 shadow-none hover:bg-skin-button-disabled active:bg-skin-button-disabled"
        />
        <Modal.Root isOpen={open} setOpen={() => setOpen(!open)}>
          <Modal.Content>
            <div
              onClick={() => setOpen(false)}
              className="flex max-w-[450px] flex-col items-center justify-center gap-2 text-center"
            >
              <BsQuestionCircle className="text-7xl text-skin-secondary-text max-[432px]:min-h-[72px] max-[432px]:min-w-[72px]" />
              <h2 className="text-3xl font-bold text-skin-secondary-text">
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
