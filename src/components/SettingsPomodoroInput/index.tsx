import { SettingsPomodoroInputProps } from './types';

export const SettingsPomodoroInput = ({
  labelText,
  name,
  defaultValue,
  type,
  onChange,
}: SettingsPomodoroInputProps) => {
  return (
    <label htmlFor={name} className="flex flex-col gap-2 font-semibold">
      {labelText}
      <input
        type={type}
        name={name}
        min="1"
        defaultValue={defaultValue}
        onChange={onChange}
        step="1"
        className="w-24 appearance-none rounded-md bg-bluishGray p-2 text-lg font-semibold text-white outline-none"
      />
    </label>
  );
};
