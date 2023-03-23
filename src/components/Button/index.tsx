import { ButtonProps } from './Button.types';

export const Button = ({ text, onClick }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="rounded bg-bluishGray from-bluishPurple to-vibrantPurple p-1 text-lg font-semibold transition duration-300 ease-in-out hover:bg-gradient-to-tr"
    >
      {text}
    </button>
  );
};
