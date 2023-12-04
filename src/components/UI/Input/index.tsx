import { InputProps } from './types';

export const Input = ({ name, label, ...rest }: InputProps) => {
  return (
    <div className="w-full space-y-1.5">
      <label className="text-xl font-semibold" htmlFor={name}>
        {label}:
      </label>
      <input
        id={name}
        name={name}
        {...rest}
        className="block w-full rounded-sm border-2 border-bluishPurple bg-transparent px-2 text-lg blueTheme:border-blueTheme dark:border-white"
      />
    </div>
  );
};
