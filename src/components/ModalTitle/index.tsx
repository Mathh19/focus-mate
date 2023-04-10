import { ModalTitleProps } from './types';

export const ModalTitle = ({ children }: ModalTitleProps) => {
  return (
    <div className="flex items-center gap-1 text-xl font-semibold">
      {children}
    </div>
  );
};
