import { WeeklyTasksProps } from '../shared-types/tasks';

export const getDayIndex = (
  currentDay: string,
  weeklyTasks: WeeklyTasksProps[],
) => {
  return weeklyTasks.findIndex((item) => item.day === currentDay);
};
