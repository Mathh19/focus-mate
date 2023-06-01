import { MdOutlinePostAdd } from 'react-icons/md';
import { TaskInputProps } from './types';

export const TaskInput = ({
  newTask,
  handleChange,
  handleSubmit,
}: TaskInputProps) => {
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <label className="flex w-full items-center justify-between gap-1 rounded-md border-4 border-dashed border-bluishPurple/60 bg-none p-2 text-white/50 transition duration-200 ease-in-out focus-within:border-bluishPurple focus-within:text-white hover:border-bluishPurple hover:text-white blueTheme:border-blueTheme/60 blueTheme:focus-within:border-blueTheme blueTheme:hover:border-blueTheme dark:border-darkTheme/60 dark:focus-within:border-white dark:hover:border-white">
      <input
        type="text"
        name="addTask"
        value={newTask.name}
        placeholder="Add a task..."
        className="w-full bg-transparent outline-none"
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
