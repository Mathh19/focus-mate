import { Button } from '../../../UI/Button';
import { ButtonDropdownProps } from './types';

export const ButtonDropdown = ({
  danger = false,
  text,
  icon,
  onClick,
}: ButtonDropdownProps) => {
  return (
    <Button
      danger={danger}
      text={text}
      onClick={onClick}
      icon={icon}
      className="w-full flex-row-reverse justify-between rounded-md bg-transparent font-bold text-skin-secondary-text shadow-none hover:text-skin-primary-text active:text-skin-primary-text data-[danger=true]:bg-transparent"
    />
  );
};
