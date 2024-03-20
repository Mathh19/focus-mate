import { InputHTMLAttributes } from 'react';

export type InputProps = {
  name: string;
  label: string;
  valueInput?: string;
  error?: string;
} & InputHTMLAttributes<HTMLInputElement>;
