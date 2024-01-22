import { ComponentProps, ElementType } from 'react';

export type FormButtonProps = ComponentProps<'button'> & {
  text: string;
  icon?: ElementType;
  danger?: boolean;
  loginGoogle?: boolean;
};
