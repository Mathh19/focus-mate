import { forwardRef } from 'react';
import { FaCheck } from 'react-icons/fa6';
import { VscError } from 'react-icons/vsc';
import { InputProps } from './types';
import { ErrorMessage } from '../ErrorMessage';

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ name, label, error, valueInput, ...rest }, ref) => {
    return (
      <div className="w-full space-y-2.5">
        <label className="text-3xl font-semibold" htmlFor={name}>
          {label}:
        </label>
        <div className="flex items-center rounded-sm border-[3px] border-skin-border-primary px-2 py-1 focus-within:shadow-shadowAllSides focus-within:shadow-skin-base">
          <input
            id={name}
            name={name}
            ref={ref}
            {...rest}
            className="block w-full bg-transparent text-2xl font-semibold outline-none"
          />
          <span>
            {!error && valueInput && (
              <FaCheck size={20} className="text-green-400" />
            )}
            {error && <VscError size={20} className="text-red-600" />}
          </span>
        </div>
        {error && <ErrorMessage error={error} />}
      </div>
    );
  },
);
