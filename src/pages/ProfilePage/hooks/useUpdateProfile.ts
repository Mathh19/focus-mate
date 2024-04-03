import { useState } from 'react';
import { z } from 'zod';
import { removeAvatar, updateUser, uploadAvatar } from '../../../services/user';
import { usePreviewAvatar } from './usePreviewAvatar';

const schema = z.object({
  username: z
    .string()
    .min(2, 'Enter a valid username must have between 2 and 25 characters')
    .max(25, 'Enter a valid username must have between 2 and 25 characters')
    .optional()
    .or(z.literal('')),
  password: z
    .string()
    .min(8, 'Your password must have at least 8 characters.')
    .optional()
    .or(z.literal('')),
});

export type FormUpdateProfileProps = z.infer<typeof schema>;

export const useUpdateProfile = (imageUrl?: string) => {
  const [loading, setLoading] = useState(false);
  const { previewAvatar, setPreviewAvatar } = usePreviewAvatar(imageUrl);
  const [avatar, setAvatar] = useState<File | Blob | null | undefined>();

  const handleSubmitForm = (data: FormUpdateProfileProps) => {
    if (avatar) {
      const formData = new FormData();
      formData.append('file', avatar as File);
      uploadAvatar(formData);
    }

    if (!previewAvatar && !avatar) {
      removeAvatar();
    }

    updateUser(data);

    setLoading(true);
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  return {
    schema,
    avatar,
    previewAvatar,
    loading,
    setAvatar,
    setPreviewAvatar,
    handleSubmitForm,
  };
};
