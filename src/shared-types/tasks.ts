export type DayProps =
  | 'Sunday'
  | 'Monday'
  | 'Tuesday'
  | 'Wednesday'
  | 'Thursday'
  | 'Friday'
  | 'Saturday';

export type TaskProps = {
  _id: string;
  name: string;
  day?: DayProps;
  finished: boolean;
  inFocus?: boolean;
};
