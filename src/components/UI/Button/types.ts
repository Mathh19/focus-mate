import { ComponentProps, ReactNode } from 'react';

export type ButtonProps = {
  text?: string;
  icon?: ReactNode;
  isLoading?: boolean;
  danger?: boolean;
} & ComponentProps<'button'>;
