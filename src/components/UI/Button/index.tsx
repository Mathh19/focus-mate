import { twMerge } from 'tailwind-merge';
import { ButtonProps } from './types';
import { LoadingSpinner } from '../LoadingSpinner';

export const Button = ({
  danger = false,
  isLoading = false,
  text,
  icon,
  className,
  ...rest
}: ButtonProps) => {
  return (
    <button
      data-danger={danger}
      className={twMerge(
        'flex items-center justify-center gap-1.5 rounded-sm bg-skin-button-base px-2 py-1 text-xl font-semibold text-skin-primary-text shadow-md shadow-black/30 transition-all duration-150 hover:bg-skin-button-hover active:bg-skin-button-active disabled:bg-skin-button-disabled disabled:text-skin-button-active data-[danger=true]:bg-red-600 data-[danger=true]:hover:bg-red-700 data-[danger=true]:active:bg-red-800 data-[danger=true]:disabled:bg-red-900 data-[danger=true]:disabled:text-red-950',
        className,
      )}
      {...rest}
    >
      {!isLoading && icon}
      {isLoading && <LoadingSpinner />}
      {!isLoading && text}
    </button>
  );
};
