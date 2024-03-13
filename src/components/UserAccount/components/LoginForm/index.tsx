import { z } from 'zod';
import { FcGoogle } from 'react-icons/fc';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useContext, useState } from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import { ErrorMessage } from '../../../UI/ErrorMessage';
import { FormButton } from '../../../UI/FormButton';
import { Input } from '../../../UI/Input';
import { ShowPassword } from '../ShowPassword';
import { loginWithGoogle } from '../../../../services/loginWithGoogle';
import { AuthContext } from '../../../../contexts/AuthContext/AuthContext';

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
  const [isLoading, setIsLoading] = useState(false);
  const { signIn, googleSignIn } = useContext(AuthContext);

  const { email, password } = getValues();

  const handleSubmitForm = (data: FormProps) => {
    const { email, password } = data;

    setIsLoading(true);

    signIn(email, password)
      .catch((err) => {
        setErrorMessage(err.response.data.message);
      })
      .finally(() => setIsLoading(false));
  };

  const googleLoginButton = useGoogleLogin({
    onSuccess: (response) => {
      loginWithGoogle(response)
        .then((response) => {
          googleSignIn({
            email: response.email,
            username: response.name,
          }).catch((err) => setErrorMessage(err.response.data.message));
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
      <div>
        <FormButton
          isLoading={isLoading}
          type="submit"
          text={'login'}
          className="text-xl"
        />
        <FormButton
          type="button"
          loginGoogle={true}
          text="Login with google"
          className="text-xl text-black"
          onClick={() => googleLoginButton()}
          icon={FcGoogle}
        />
      </div>
    </form>
  );
};
