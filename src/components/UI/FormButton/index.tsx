import { twMerge } from 'tailwind-merge';
import { FormButtonProps } from './types';

export const FormButton = ({
  text,
  danger = false,
  loginGoogle = false,
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
      className={twMerge(
        `relative mt-4 flex w-full max-w-xs items-center justify-center gap-3 overflow-hidden rounded-sm py-1.5 text-2xl font-semibold duration-150 ease-in-out active:brightness-75 data-[danger=true]:bg-dangerColor blueTheme:data-[danger=true]:bg-dangerColor dark:data-[danger=true]:bg-dangerColor dark:data-[danger=true]:text-white ${
          loginGoogle ? bgVariants.google : bgVariants.default
        }`,
        className,
      )}
      {...rest}
    >
      {Icon && <Icon className="text-2xl" />}
      {text}
    </button>
  );
};
