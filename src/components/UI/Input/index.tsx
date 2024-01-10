import { ForwardedRef, forwardRef } from 'react';
import { FaCheck } from 'react-icons/fa6';
import { VscError } from 'react-icons/vsc';
import { InputProps } from './types';
import { ErrorMessage } from '../ErrorMessage';

export const Input = forwardRef(function Input(
  { name, label, error, valueInput, ...rest }: InputProps,
  ref: ForwardedRef<HTMLInputElement>,
) {
  return (
    <div className="w-full space-y-2.5">
      <label className="text-3xl font-semibold" htmlFor={name}>
        {label}:
      </label>
      <div className="flex items-center rounded-sm border-[3px] border-bluishPurple px-2 py-1 focus-within:shadow-shadowAllSides focus-within:shadow-bluishPurple blueTheme:border-blueTheme blueTheme:focus-within:shadow-blueTheme dark:border-white dark:focus-within:shadow-white">
        <input
          id={name}
          name={name}
          ref={ref}
          {...rest}
          className="block w-full bg-transparent text-2xl font-semibold outline-none"
        />
        <span>
          {!error && valueInput && (
            <FaCheck size={20} className="text-successColor" />
          )}
          {error && <VscError size={20} className="text-dangerColor" />}
        </span>
      </div>
      {error && <ErrorMessage error={error} />}
    </div>
  );
});
