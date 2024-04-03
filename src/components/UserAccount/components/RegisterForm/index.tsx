import { FcGoogle } from 'react-icons/fc';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { UploadAvatar } from '../../../UI/UploadAvatar';
import { Input } from '../../../UI/Input';
import { ErrorMessage } from '../../../UI/ErrorMessage';
import { Button } from '../../../UI/Button';
import { useGoogleAccount } from '../../hooks/useGoogleAccount';
import { useRegisterAccount } from '../../hooks/useRegisterAccount';

const schema = z.object({
  username: z
    .string()
    .min(2, 'Enter a valid username must have between 2 and 25 characters')
    .max(25, 'Enter a valid username must have between 2 and 25 characters'),
  email: z.string().email('Please enter a valid email.'),
  password: z.string().min(8, 'Your password must have at least 8 characters.'),
});

type FormProps = z.infer<typeof schema>;

export const RegisterForm = () => {
  const {
    handleSubmit,
    register,
    getValues,
    formState: { errors },
  } = useForm<FormProps>({
    mode: 'all',
    reValidateMode: 'onChange',
    resolver: zodResolver(schema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const { username, email, password } = getValues();

  const {
    handleSubmitForm,
    avatar,
    setAvatar,
    loading: authLoading,
    error: authError,
  } = useRegisterAccount();

  const {
    handleGoogleLogin,
    loading: googleLoading,
    error: googleError,
  } = useGoogleAccount();

  const handleUploadAvatarChange = (e: React.FormEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement & {
      files: File;
    };
    setAvatar(target.files[0]);
  };

  return (
    <form
      onSubmit={handleSubmit(handleSubmitForm)}
      className="w-full space-y-4"
    >
      <UploadAvatar contentImage={avatar} onChange={handleUploadAvatarChange} />
      <Input
        {...register('username')}
        error={errors.username && errors.username.message}
        name="username"
        label="username"
        type="text"
        autoComplete="username"
        placeholder="username"
        valueInput={username}
      />
      <Input
        {...register('email')}
        error={errors.email && errors.email.message}
        label="Email"
        type="email"
        autoComplete="email"
        placeholder="email@example.com"
        valueInput={email}
      />
      <Input
        {...register('password')}
        error={errors.password && errors.password.message}
        name="password"
        label="Password"
        type="password"
        placeholder="password"
        valueInput={password}
      />
      {authError.length > 0 && <ErrorMessage error={authError} />}
      {googleError.length > 0 && <ErrorMessage error={googleError} />}
      <div className="space-y-4">
        <Button
          disabled={authLoading}
          isLoading={authLoading}
          type="submit"
          text="register"
          className="w-full px-2 py-1.5 text-xl disabled:cursor-no-drop"
        />
        <Button
          type="button"
          disabled={googleLoading}
          isLoading={googleLoading}
          text="Google"
          className="w-full bg-white px-2 py-1.5 text-xl text-black hover:bg-zinc-200 active:bg-zinc-300 disabled:cursor-no-drop disabled:bg-zinc-600 disabled:text-white"
          onClick={() => handleGoogleLogin()}
          icon={<FcGoogle size={24} />}
        />
      </div>
    </form>
  );
};
