import { ReactNode } from 'react';

export type ButtonDropdownProps = {
  text: string;
  icon: ReactNode;
  onClick: () => void;
  danger?: boolean;
};
