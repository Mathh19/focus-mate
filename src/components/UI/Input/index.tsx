import { ForwardedRef, forwardRef } from 'react';
import { InputProps } from './types';
import { ErrorMessage } from '../ErrorMessage';

export const Input = forwardRef(function Input(
  { name, label, error, ...rest }: InputProps,
  ref: ForwardedRef<HTMLInputElement>,
) {
  return (
    <div className="w-full space-y-1.5">
      <label className="text-xl font-semibold" htmlFor={name}>
        {label}:
      </label>
      <input
        id={name}
        name={name}
        ref={ref}
        {...rest}
        className="block w-full rounded-sm border-2 border-bluishPurple bg-transparent px-2 text-lg blueTheme:border-blueTheme dark:border-white"
      />
      {error && <ErrorMessage error={error} />}
    </div>
  );
});
