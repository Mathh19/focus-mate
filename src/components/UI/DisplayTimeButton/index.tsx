import { DisplayTimeButtonProps } from './types';

export const DisplayTimeButton = ({
  text,
  focused,
  onClick,
}: DisplayTimeButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`rounded bg-skin-input-primary from-skin-primary-gradient to-skin-secondary-gradient p-2 text-xl font-semibold transition duration-300 ease-in-out hover:bg-gradient-to-tr hover:shadow-shadowAllSides hover:shadow-skin-neon-light-effect focus:bg-gradient-to-tr focus:shadow-shadowAllSides focus:shadow-skin-neon-light-effect max-[435px]:text-base ${
        focused && 'bg-gradient-to-tr'
      }`}
    >
      {text}
    </button>
  );
};
