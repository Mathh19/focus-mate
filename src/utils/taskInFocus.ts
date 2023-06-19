import { TaskProps } from '../shared-types/tasks';

export const taskInFocus = (tasks: TaskProps[], taskCheck: TaskProps) => {
  const focusedTask = tasks.map((task) => {
    if (task === taskCheck) {
      return { ...task, inFocus: true };
    } else {
      return { ...task, inFocus: false };
    }
  });

  return { focusedTask };
};
