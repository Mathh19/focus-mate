export type DayProps =
  | 'Sunday'
  | 'Monday'
  | 'Tuesday'
  | 'Wednesday'
  | 'Thursday'
  | 'Friday'
  | 'Saturday';

export type TaskProps = {
  name: string;
  finished: boolean;
  inFocus?: boolean;
};

export type WeeklyTasksProps = {
  day: DayProps;
  tasks: TaskProps[];
};
