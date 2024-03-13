import { MdOutlinePostAdd } from 'react-icons/md';
import { TaskInputProps } from './types';

export const TaskInput = ({
  newTask,
  disabled,
  handleChange,
  handleSubmit,
}: TaskInputProps) => {
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <label className="flex w-full items-center justify-between gap-1 rounded-md border-4 border-dashed border-skin-border-primary bg-none p-2 text-skin-primary-text opacity-70 transition duration-200 ease-in-out focus-within:opacity-100 hover:opacity-100">
      <input
        type="text"
        name="addTask"
        disabled={disabled}
        value={newTask.name}
        placeholder="Add a task..."
        className="w-full bg-transparent text-2xl font-semibold outline-none disabled:cursor-not-allowed"
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
      <MdOutlinePostAdd
        className="cursor-pointer text-4xl"
        onClick={handleSubmit}
        aria-label="Add Task"
      />
    </label>
  );
};
