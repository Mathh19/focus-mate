import { twMerge } from 'tailwind-merge';

type ModalActionsProps = {
  children: React.ReactNode;
  className?: string;
};

export const ModalActions = ({ children, className }: ModalActionsProps) => {
  return (
    <footer
      className={twMerge(
        'flex w-full justify-between rounded-b-lg p-4',
        className,
      )}
    >
      {children}
    </footer>
  );
};
