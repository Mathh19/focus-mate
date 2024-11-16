import { createPortal } from 'react-dom';

type ModalRootProps = {
  isOpen: boolean;
  setOpen: () => void;
  children: React.ReactNode;
  overflow?: boolean;
};

export const ModalRoot = ({
  isOpen,
  setOpen,
  overflow = true,
  children,
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
              className='max-h-[95%] w-full max-w-3xl rounded-lg bg-skin-modal-background data-[overflow="true"]:overflow-auto'
            >
              {children}
            </div>
          </div>,
          document.body,
        )}
    </>
  );
};
