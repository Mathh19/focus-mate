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
      {isOpen && (
        <div
          onClick={setOpen}
          className="fixed inset-0 z-40 flex items-center justify-center bg-backgroundColor/60 px-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className={`z-50 max-h-[95%] w-full max-w-lg ${
              overflow && 'overflow-auto'
            } rounded-lg bg-darkBlue dark:bg-darkTheme-dark-grey`}
          >
            {children}
          </div>
        </div>
      )}
    </>
  );
};
