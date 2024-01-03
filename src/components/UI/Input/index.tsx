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
    <div className="w-full space-y-1.5">
      <label className="text-xl font-semibold" htmlFor={name}>
        {label}:
      </label>
      <div className="relative flex items-center">
        <input
          id={name}
          name={name}
          ref={ref}
          {...rest}
          className="block w-full rounded-sm border-2 border-bluishPurple bg-transparent px-2 text-lg blueTheme:border-blueTheme dark:border-white"
        />
        <span className="absolute right-0 mr-2">
          {!error && valueInput && (
            <FaCheck size={15} className="text-successColor" />
          )}
          {error && <VscError size={15} className="text-dangerColor" />}
        </span>
      </div>
      {error && <ErrorMessage error={error} />}
    </div>
  );
});
