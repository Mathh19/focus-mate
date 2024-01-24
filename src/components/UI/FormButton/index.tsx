import { twMerge } from 'tailwind-merge';
import { FormButtonProps } from './types';
import { LoadingSpinner } from '../LoadingSpinner';

export const FormButton = ({
  text,
  danger = false,
  loginGoogle = false,
  isLoading = false,
  icon: Icon,
  className,
  ...rest
}: FormButtonProps) => {
  const bgVariants = {
    default:
      'bg-bluishPurple blueTheme:bg-blueTheme dark:bg-white dark:text-darkTheme-background',
    google: 'bg-white text-backgroundColor',
  };

  return (
    <button
      data-danger={danger}
      disabled={isLoading}
      className={twMerge(
        `relative mt-4 flex w-full max-w-xs items-center justify-center gap-3 overflow-hidden rounded-sm py-1.5 text-2xl font-semibold duration-150 ease-in-out active:brightness-75 disabled:cursor-no-drop disabled:bg-bluishPurple-dark disabled:active:brightness-100 data-[danger=true]:bg-dangerColor disabled:blueTheme:bg-blueTheme-royal-blue blueTheme:data-[danger=true]:bg-dangerColor disabled:dark:bg-darkTheme-grey dark:data-[danger=true]:bg-dangerColor dark:data-[danger=true]:text-white ${
          loginGoogle ? bgVariants.google : bgVariants.default
        }`,
        className,
      )}
      {...rest}
    >
      {isLoading && <LoadingSpinner />}
      {Icon && !isLoading && <Icon className="text-2xl" />}
      {!isLoading && text}
    </button>
  );
};
