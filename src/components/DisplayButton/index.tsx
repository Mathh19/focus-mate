import { DisplayButtonProps } from './types';

export const DisplayButton = ({
  text,
  focused,
  onClick,
}: DisplayButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`rounded bg-bluishGray from-bluishPurple to-pink p-1 text-lg font-semibold shadow-lg transition duration-300 ease-in-out hover:bg-gradient-to-tr hover:shadow-bluishPurple/50 focus:bg-gradient-to-tr focus:shadow-bluishPurple/50 ${
        focused && 'bg-gradient-to-tr'
      }`}
    >
      {text}
    </button>
  );
};
