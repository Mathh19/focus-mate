import { ComponentProps, ReactNode } from 'react';
import { Button } from '../Button';

type ModalActionProps = {
  text?: string;
  icon?: ReactNode;
  isLoading?: boolean;
  danger?: boolean;
} & ComponentProps<'button'>;

export const ModalAction = ({
  text,
  className,
  danger = false,
  ...rest
}: ModalActionProps) => {
  return <Button text={text} danger={danger} className={className} {...rest} />;
};
