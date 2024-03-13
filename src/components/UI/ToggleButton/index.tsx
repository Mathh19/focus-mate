import { ToggleButtonProps } from './types';

export const ToggleButton = ({
  label,
  toggled,
  setToggle,
}: ToggleButtonProps) => {
  return (
    <div className="flex justify-between text-lg font-semibold drop-shadow-md">
      <span>{label}</span>
      <label
        htmlFor={label}
        className="relative inline-block h-7 w-14 cursor-pointer"
      >
        <input
          id={label}
          type="checkbox"
          onChange={() => setToggle()}
          checked={toggled}
          className="peer h-0 w-0 opacity-0"
        />

        <span className="absolute inset-0 rounded-full bg-skin-input-primary transition duration-300 ease-in-out before:absolute before:bottom-1 before:left-1 before:h-5 before:w-5 before:rounded-full before:bg-white before:transition before:duration-300 before:ease-in-out before:content-[''] peer-checked:bg-gradient-to-r peer-checked:from-skin-primary-gradient peer-checked:to-skin-secondary-gradient peer-checked:before:translate-x-7"></span>
      </label>
    </div>
  );
};
