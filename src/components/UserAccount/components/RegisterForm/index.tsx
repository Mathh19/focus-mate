import { FcGoogle } from 'react-icons/fc';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useContext, useState } from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import { UploadAvatar } from '../../../UI/UploadAvatar';
import { Input } from '../../../UI/Input';
import { ShowPassword } from '../ShowPassword';
import { ErrorMessage } from '../../../UI/ErrorMessage';
import { loginWithGoogle } from '../../../../services/loginWithGoogle';
import { AuthContext } from '../../../../contexts/AuthContext/AuthContext';
import { uploadAvatar } from '../../../../services/user';
import { signUp } from '../../../../services/signUp';
import { validateAvatar } from '../../../../utils/validateAvatar';
import { Button } from '../../../UI/Button';

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

  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState({
    authLoading: false,
    googleLoading: false,
  });
  const [contentAvatar, setContentAvatar] = useState<File | undefined>();
  const [displayPassword, setDisplayPassword] = useState(false);
  const { signIn, googleSignIn } = useContext(AuthContext);

  const handleSubmitForm = (data: FormProps) => {
    const { email, password, username } = data;

    if (contentAvatar) {
      if (validateAvatar(contentAvatar) !== true) {
        setErrorMessage(validateAvatar(contentAvatar) as string);
        return;
      }
    }

    setIsLoading({ ...isLoading, authLoading: true });

    signUp({ email, password, username })
      .then(() => {
        signIn(email, password).then(async () => {
          if (contentAvatar) {
            const formData = new FormData();
            formData.append('file', contentAvatar as File);
            uploadAvatar(formData);
          }
        });
      })
      .catch((err) => {
        setErrorMessage(err.response.data.message);
      })
      .finally(() => setIsLoading({ ...isLoading, authLoading: false }));
    return;
  };

  const handleOnChange = (e: React.FormEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement & {
      files: File;
    };
    setContentAvatar(target.files[0]);
  };

  const googleLoginButton = useGoogleLogin({
    onSuccess: (response) => {
      loginWithGoogle(response)
        .then((response) => {
          setIsLoading({ ...isLoading, googleLoading: true });
          googleSignIn({
            email: response.email,
            username: response.name,
          }).catch((err) => setErrorMessage(err.response.data.message));
        })
        .catch((err) => console.log(err))
        .finally(() => setIsLoading({ ...isLoading, googleLoading: false }));
    },
  });

  return (
    <form
      onSubmit={handleSubmit(handleSubmitForm)}
      className="w-full space-y-4"
    >
      <UploadAvatar contentImage={contentAvatar} onChange={handleOnChange} />
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
        type={displayPassword ? 'text' : 'password'}
        placeholder="passsword"
        valueInput={password}
      />
      <ShowPassword value={displayPassword} setValue={setDisplayPassword} />
      {errorMessage.length > 0 && <ErrorMessage error={errorMessage} />}
      <div className="space-y-4">
        <Button
          disabled={isLoading.authLoading}
          isLoading={isLoading.authLoading}
          type="submit"
          text="register"
          className="w-full px-2 py-1.5 text-xl disabled:cursor-no-drop"
        />
        <Button
          type="button"
          disabled={isLoading.googleLoading}
          isLoading={isLoading.googleLoading}
          text="Google"
          className="w-full bg-white px-2 py-1.5 text-xl text-black hover:bg-zinc-200 active:bg-zinc-300 disabled:cursor-no-drop disabled:bg-zinc-600 disabled:text-white"
          onClick={() => googleLoginButton()}
          icon={<FcGoogle size={24} />}
        />
      </div>
    </form>
  );
};
