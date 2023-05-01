import { useState } from 'react';
import { BsQuestionCircle } from 'react-icons/bs';
import { about } from '../../content/about.json';

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
          <BsQuestionCircle className="text-3xl transition duration-200 ease-in-out hover:text-bluishPurple focus:text-bluishPurple" />
        </button>
        {open && (
          <div
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-50 flex min-h-screen items-center justify-center bg-backgroundColor/60 px-4"
          >
            <div className="rounded-lg bg-darkGray p-4 font-semibold">
              <div className="flex max-h-[500px] max-w-[450px] flex-col items-center gap-3 overflow-y-auto rounded-lg text-center text-lg font-semibold">
                <BsQuestionCircle className="text-7xl text-bluishPurple max-[432px]:min-h-[72px] max-[432px]:min-w-[72px]" />
                <h2 className="text-3xl font-bold text-bluishPurple">
                  What is the Pomodoro ?
                </h2>
                <p>{about}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
