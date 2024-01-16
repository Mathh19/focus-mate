import { useState, useContext } from 'react';
import { IoClose } from 'react-icons/io5';
import { FcGoogle } from 'react-icons/fc';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useGoogleLogin } from '@react-oauth/google';
import { Modal } from '../UI/Modal';
import { Input } from '../UI/Input';
import { uploadAvatar } from '../../services/user';
import { AuthContext } from '../../contexts/AuthContext/AuthContext';
import { ErrorMessage } from '../UI/ErrorMessage';
import { UploadAvatar } from '../UI/UploadAvatar';
import { validateAvatar } from '../../utils/validateAvatar';
import { signUp } from '../../services/signUp';
import { loginWithGoogle } from '../../services/loginWithGoogle';

const schema = z.object({
  username: z
    .string()
    .min(2, 'Enter a valid username must have between 2 and 25 characters')
    .max(25, 'Enter a valid username must have between 2 and 25 characters')
    .optional()
    .or(z.literal('')),
  email: z.string().email('Please enter a valid email.'),
  password: z.string().min(8, 'Your password must have at least 8 characters.'),
});

type FormProps = z.infer<typeof schema>;

export const Login = () => {
  const [open, setOpen] = useState(false);
  const [createAcc, setCreateAcc] = useState(false);
  const [contentAvatar, setContentAvatar] = useState<File | undefined>();
  const [errorMessage, setErrorMessage] = useState('');
  const { signIn, googleSignIn } = useContext(AuthContext);
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
      email: '',
      password: '',
    },
  });
  const { username, email, password } = getValues();

  const handleSubmitForm = (data: FormProps) => {
    const { email, password, username } = data;

    if (createAcc && contentAvatar) {
      if (validateAvatar(contentAvatar) !== true) {
        setErrorMessage(validateAvatar(contentAvatar) as string);
        return;
      }
    }

    if (createAcc && username) {
      signUp({ email, password, username })
        .then(() => {
          signIn(email, password).then(async () => {
            if (contentAvatar) {
              const formData = new FormData();
              formData.append('file', contentAvatar as File);
              uploadAvatar(formData);
            }
          });
          setOpen(false);
        })
        .catch((err) => setErrorMessage(err.response.data.message));
      return;
    }
    signIn(email, password).catch((err) =>
      setErrorMessage(err.response.data.message),
    );
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
          googleSignIn({
            email: response.email,
            username: response.name,
          }).catch((err) => setErrorMessage(err.response.data.message));
        })
        .catch((err) => console.log(err));
    },
  });

  return (
    <div>
      <button
        aria-label="login"
        onClick={() => setOpen(true)}
        className="rounded-sm bg-bluishPurple px-2 py-1 font-semibold outline-4 blueTheme:bg-blueTheme dark:bg-white dark:text-backgroundColor"
      >
        Login
      </button>
      <Modal.Root isOpen={open} setOpen={() => setOpen(false)}>
        <Modal.Header>
          <h2 className="text-xl font-semibold">
            {createAcc ? 'Sign up' : 'Sign in'}
          </h2>
          <button
            onClick={() => setOpen(false)}
            aria-label="close modal"
            className="text-2xl"
          >
            <IoClose />
          </button>
        </Modal.Header>
        <Modal.Content>
          <form
            onSubmit={handleSubmit(handleSubmitForm)}
            className="flex w-full max-w-xs flex-col items-center space-y-3"
          >
            {createAcc && (
              <>
                <UploadAvatar
                  contentImage={contentAvatar}
                  onChange={handleOnChange}
                />
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
              </>
            )}
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
              placeholder="passsword"
              valueInput={password}
            />
            {errorMessage.length > 0 && <ErrorMessage error={errorMessage} />}
            <div className="flex w-full flex-col gap-4 py-5">
              <button
                type="button"
                onClick={() => googleLoginButton()}
                className="flex w-full justify-center gap-3 rounded-sm bg-white p-2 font-semibold text-backgroundColor"
              >
                <FcGoogle size={24} />
                <span className="max-[256px]:hidden">Login with google</span>
              </button>
              <button
                type="submit"
                className="w-full rounded-sm bg-bluishPurple p-2 font-semibold blueTheme:bg-blueTheme dark:bg-white dark:text-darkBackgroundColor"
              >
                {createAcc ? 'register' : 'login'}
              </button>
              <p className="text-md font-medium">
                {!createAcc ? 'First time using ?' : 'Already part ?'}{' '}
                <span
                  onClick={() => setCreateAcc(!createAcc)}
                  className="cursor-pointer text-bluishPurple blueTheme:text-blueTheme dark:text-white"
                >
                  {!createAcc ? 'Register' : 'Login'}
                </span>
              </p>
            </div>
          </form>
        </Modal.Content>
      </Modal.Root>
    </div>
  );
};
