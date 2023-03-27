import { ButtonProps } from './Button.types';

export const Button = ({ text, onClick }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="rounded bg-bluishGray from-bluishPurple to-pinkColor p-1 text-lg font-semibold shadow-lg transition duration-300 ease-in-out hover:bg-gradient-to-tr hover:shadow-bluishPurple/50"
    >
      {text}
    </button>
  );
};
