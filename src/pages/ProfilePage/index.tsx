import { useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { UserProps } from '../../contexts/AuthContext/types';
import { useFetch } from '../../hooks/useFetch';
import { Input } from '../../components/UI/Input';
import { UploadAvatar } from '../../components/UI/UploadAvatar';
import { usePreviewAvatar } from './hooks/usePreviewAvatar';
import { removeAvatar, updateUser } from '../../services/user';
import { uploadAvatar } from '../../services/user';

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

type FormProps = z.infer<typeof schema>;

export const ProfilePage = () => {
  const { data } = useFetch<UserProps>('/user');
  const avatarUrl = data ? import.meta.env.VITE_IMG_URL + data.avatar : '';
  const hasAvatar = data && data.avatar;
  const { previewAvatar, setPreviewAvatar } = usePreviewAvatar(
    hasAvatar && avatarUrl,
  );
  const [contentAvatar, setContentAvatar] = useState<
    File | Blob | null | undefined
  >();

  const {
    handleSubmit,
    getValues,
    register,
    formState: { errors },
  } = useForm<FormProps>({
    mode: 'all',
    reValidateMode: 'onChange',
    resolver: zodResolver(schema),
    defaultValues: {
      username: '',
      password: '',
    },
  });
  const { username, password } = getValues();

  const handleSubmitForm = (data: FormProps) => {
    updateUser(data);
    if (contentAvatar) {
      const formData = new FormData();
      formData.append('file', contentAvatar as File);
      uploadAvatar(formData);
    }

    if (!previewAvatar && !contentAvatar) {
      removeAvatar();
    }
  };

  const handleOnChange = (e: React.FormEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement & {
      files: File;
    };
    setContentAvatar(target.files[0]);
  };

  return (
    <div className="mx-4">
      <h2 className="my-4 text-center text-4xl font-semibold">
        Edit your account
      </h2>
      <form
        onSubmit={handleSubmit(handleSubmitForm)}
        className="flex w-full flex-col items-center gap-4"
      >
        <UploadAvatar
          contentImage={contentAvatar ? contentAvatar : previewAvatar}
          setPreviewImage={setPreviewAvatar}
          onChange={handleOnChange}
        />
        <div className="w-full max-w-xs space-y-4">
          <Input
            {...register('username')}
            error={errors.username && errors.username.message}
            label="username"
            name="username"
            placeholder="new username"
            autoComplete="username"
            valueInput={username}
          />
          <Input
            {...register('password')}
            error={errors.password && errors.password.message}
            label="password"
            name="password"
            type="password"
            placeholder="new password"
            valueInput={password}
          />
        </div>
        <button
          type="submit"
          className="mt-4 w-full max-w-xs rounded-sm bg-bluishPurple py-1 text-lg font-semibold blueTheme:bg-blueTheme dark:bg-white dark:text-darkTheme-background"
        >
          save changes
        </button>
      </form>
    </div>
  );
};
