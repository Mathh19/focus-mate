import { ComponentProps, ElementType } from 'react';

export type FormButtonProps = ComponentProps<'button'> & {
  text: string;
  icon?: ElementType;
  isLoading?: boolean;
  danger?: boolean;
  loginGoogle?: boolean;
};
