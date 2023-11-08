import { ModalContentProps } from './types';

export const ModalHeader = ({ children }: ModalContentProps) => {
  return (
    <header className="flex items-center justify-between border-b border-bluishGray p-4">
      {children}
    </header>
  );
};
