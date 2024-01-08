import { Dispatch, InputHTMLAttributes } from 'react';

export type UploadInputProps = {
  contentImage: File | Blob | null | undefined;
  setPreviewImage?: Dispatch<Blob | undefined>;
} & InputHTMLAttributes<HTMLInputElement>;
