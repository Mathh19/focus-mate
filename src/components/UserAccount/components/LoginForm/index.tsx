import { z } from 'zod';
import { FcGoogle } from 'react-icons/fc';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useContext, useState } from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import { ErrorMessage } from '../../../UI/ErrorMessage';
import { Input } from '../../../UI/Input';
import { ShowPassword } from '../ShowPassword';
import { loginWithGoogle } from '../../../../services/loginWithGoogle';
import { AuthContext } from '../../../../contexts/AuthContext/AuthContext';
import { Button } from '../../../UI/Button';

const schema = z.object({
  email: z.string().email('Please enter a valid email.'),
  password: z.string().min(8, 'Your password must have at least 8 characters.'),
});

type FormProps = z.infer<typeof schema>;

export const LoginForm = () => {
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
  const [errorMessage, setErrorMessage] = useState('');
  const [displayPassword, setDisplayPassword] = useState(false);
  const [isLoading, setIsLoading] = useState({
    authLoading: false,
    googleLoading: false,
  });
  const { signIn, googleSignIn } = useContext(AuthContext);

  const { email, password } = getValues();

  const handleSubmitForm = (data: FormProps) => {
    const { email, password } = data;

    setIsLoading({ ...isLoading, authLoading: true });

    signIn(email, password)
      .catch((err) => {
        setErrorMessage(err.response.data.message);
      })
      .finally(() => setIsLoading({ ...isLoading, authLoading: false }));
  };

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: (response) => {
      loginWithGoogle(response)
        .then((response) => {
          setIsLoading({ ...isLoading, googleLoading: true });
          googleSignIn({
            email: response.email,
            username: response.name,
          })
            .catch((err) => setErrorMessage(err.response.data.message))
            .finally(() =>
              setIsLoading({ ...isLoading, googleLoading: false }),
            );
        })
        .catch((err) => console.log(err));
    },
  });

  return (
    <form
      onSubmit={handleSubmit(handleSubmitForm)}
      className="w-full space-y-4"
    >
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
          text="login"
          className="w-full px-2 py-1.5 text-xl disabled:cursor-no-drop"
        />
        <Button
          type="button"
          disabled={isLoading.googleLoading}
          isLoading={isLoading.googleLoading}
          text="Google"
          className="w-full bg-white px-2 py-1.5 text-xl text-black hover:bg-zinc-200 active:bg-zinc-300 disabled:cursor-no-drop disabled:bg-zinc-600 disabled:text-white"
          onClick={() => handleGoogleLogin()}
          icon={<FcGoogle size={24} />}
        />
      </div>
    </form>
  );
};
