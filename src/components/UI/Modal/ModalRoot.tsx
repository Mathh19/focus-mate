import { createPortal } from 'react-dom';
import { twMerge } from 'tailwind-merge';

type ModalRootProps = {
  isOpen: boolean;
  setOpen: () => void;
  children: React.ReactNode;
  overflow?: boolean;
  className?: string;
};

export const ModalRoot = ({
  isOpen,
  setOpen,
  overflow = true,
  children,
  className,
}: ModalRootProps) => {
  if (isOpen) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = 'unset';
  }

  return (
    <>
      {isOpen &&
        createPortal(
          <div
            onClick={setOpen}
            className="fixed inset-0 z-[90] flex items-center justify-center bg-black/60 px-4"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              data-overflow={overflow}
              className={twMerge(
                'max-h-[95%] w-full max-w-3xl rounded-lg bg-skin-modal-background data-[overflow="true"]:overflow-auto',
                className,
              )}
            >
              {children}
            </div>
          </div>,
          document.body,
        )}
    </>
  );
};
