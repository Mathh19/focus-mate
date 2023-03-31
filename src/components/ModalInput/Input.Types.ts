export type InputProps = {
  labelText: string;
  name: string;
  type: React.HTMLInputTypeAttribute;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  defaultValue: string | number;
};
