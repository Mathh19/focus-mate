export type DayProps =
  | 'Sunday'
  | 'Monday'
  | 'Tuesday'
  | 'Wednesday'
  | 'Thursday'
  | 'Friday'
  | 'Saturday';

export type TaskProps = {
  id: string;
  name: string;
  day?: DayProps;
  finished: boolean;
  inFocus?: boolean;
};
