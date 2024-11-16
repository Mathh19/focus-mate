import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { FiLogOut } from 'react-icons/fi';
import { UserProps } from '../../contexts/AuthContext/types';
import { useFetch } from '../../hooks/useFetch';
import { Input } from '../../components/UI/Input';
import { UploadAvatar } from '../../components/UI/UploadAvatar';
import { AuthContext } from '../../contexts/AuthContext/AuthContext';
import { Skeleton } from '../../components/UI/Skeleton';
import { Head } from '../../components/Head';
import { Button } from '../../components/UI/Button';
import {
  FormUpdateProfileProps,
  useUpdateProfile,
} from './hooks/useUpdateProfile';

export const ProfilePage = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const { data, isLoading } = useFetch<UserProps>('/user');
  const {
    schema,
    loading,
    avatar,
    previewAvatar,
    setAvatar,
    setPreviewAvatar,
    handleSubmitForm,
  } = useUpdateProfile(data?.avatar_url);

  const {
    handleSubmit,
    getValues,
    register,
    formState: { errors },
  } = useForm<FormUpdateProfileProps>({
    mode: 'all',
    reValidateMode: 'onChange',
    resolver: zodResolver(schema),
    defaultValues: {
      username: '',
      password: '',
    },
  });
  const { username, password } = getValues();

  const handleOnChange = (e: React.FormEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement & {
      files: File;
    };
    setAvatar(target.files[0]);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="mx-4 h-svh">
      <Head title={`Profile ${data ? `• ${data.username}` : ''}`} />
      <h2 className="my-8 text-center text-4xl font-semibold">
        Edit your account
      </h2>
      <form
        onSubmit={handleSubmit(handleSubmitForm)}
        className="flex w-full flex-col items-center justify-center gap-8"
      >
        {isLoading ? (
          <Skeleton type="circle" size="xlg" />
        ) : (
          <UploadAvatar
            contentImage={avatar ? avatar : previewAvatar}
            setPreviewImage={setPreviewAvatar}
            onChange={handleOnChange}
          />
        )}
        <div className="w-full max-w-lg space-y-8">
          <Input
            {...register('username')}
            disabled={loading}
            error={errors.username && errors.username.message}
            label="username"
            name="username"
            placeholder="new username"
            autoComplete="username"
            valueInput={username}
          />
          <Input
            {...register('password')}
            disabled={loading}
            error={errors.password && errors.password.message}
            label="password"
            name="password"
            type="password"
            placeholder="new password"
            valueInput={password}
          />
        </div>
        <div className="w-full max-w-lg space-y-6">
          <Button
            type="submit"
            text="save changes"
            disabled={loading}
            isLoading={loading}
            className="w-full px-2 py-1.5 text-2xl"
          />
          <Button
            type="button"
            text="logout"
            danger={true}
            disabled={loading}
            onClick={handleLogout}
            icon={<FiLogOut />}
            className="w-full px-2 py-1.5 text-2xl"
          />
        </div>
      </form>
    </div>
  );
};
