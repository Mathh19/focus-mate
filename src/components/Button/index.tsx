import { ButtonProps } from './Button.types';

export const Button = ({ text, onClick }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="rounded bg-bluishGray p-1 text-lg font-semibold transition duration-300 ease-in-out hover:bg-bluishPurple"
    >
      {text}
    </button>
  );
};
