import { DisplayTimeButtonProps } from './types';

export const DisplayTimeButton = ({
  text,
  focused,
  onClick,
}: DisplayTimeButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`rounded bg-bluishGray from-bluishPurple to-pink p-2 text-xl font-semibold transition duration-300 ease-in-out hover:bg-gradient-to-tr hover:shadow-shadowAllSides hover:shadow-vibrantPurple focus:bg-gradient-to-tr focus:shadow-shadowAllSides focus:shadow-vibrantPurple blueTheme:from-blueTheme-light-blue blueTheme:to-blueTheme blueTheme:hover:shadow-blueTheme/60 blueTheme:focus:shadow-blueTheme/50 dark:bg-darkTheme-grey dark:from-white dark:to-white dark:hover:from-white dark:hover:to-white dark:hover:text-darkTheme-background dark:hover:shadow-white dark:focus:shadow-white max-[435px]:text-base ${
        focused && 'bg-gradient-to-tr dark:text-darkTheme-background'
      }`}
    >
      {text}
    </button>
  );
};
