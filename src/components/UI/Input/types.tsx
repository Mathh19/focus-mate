import { InputHTMLAttributes } from 'react';

export type InputProps = {
  name: string;
  label: string;
  error?: string;
} & InputHTMLAttributes<HTMLInputElement>;
