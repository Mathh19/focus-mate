import { InputHTMLAttributes } from 'react';

export type UploadInputProps = {
  contentImage: File | null | undefined;
} & InputHTMLAttributes<HTMLInputElement>;
