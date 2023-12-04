import { InputHTMLAttributes } from 'react';

export type InputProps = {
  name: string;
  label: string;
} & InputHTMLAttributes<HTMLInputElement>;
