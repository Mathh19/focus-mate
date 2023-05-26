import { DisplayTimeButtonProps } from './types';

export const DisplayTimeButton = ({
  text,
  focused,
  onClick,
}: DisplayTimeButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`rounded bg-bluishGray from-bluishPurple to-pink p-1 text-xl font-semibold shadow-lg transition duration-300 ease-in-out hover:bg-gradient-to-tr hover:shadow-bluishPurple/60 focus:bg-gradient-to-tr focus:shadow-bluishPurple/50 blueTheme:from-blueTheme blueTheme:to-blueTheme-800 blueTheme:hover:shadow-blueTheme/60 blueTheme:focus:shadow-blueTheme/50 dark:bg-darkTheme-dark dark:from-darkTheme dark:to-darkTheme-600 dark:hover:shadow-darkTheme/60 dark:focus:shadow-darkTheme/50 ${
        focused && 'bg-gradient-to-tr'
      }`}
    >
      {text}
    </button>
  );
};
