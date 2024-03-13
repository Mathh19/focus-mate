import { SettingsInputProps } from './types';

export const SettingsInputTimer = ({
  labelText,
  name,
  defaultValue,
  type,
  onChange,
}: SettingsInputProps) => {
  return (
    <label htmlFor={name} className="flex flex-col gap-2 font-semibold">
      {labelText}
      <input
        id={name}
        type={type}
        name={name}
        min="1"
        defaultValue={defaultValue}
        onChange={onChange}
        step="1"
        className="w-24 appearance-none rounded-md bg-skin-input-primary p-2 text-lg font-semibold text-skin-primary-text outline-none drop-shadow-md"
      />
    </label>
  );
};
