import { useContext, useState } from 'react';
import { AuthContext } from '../../../contexts/AuthContext/AuthContext';
import { signUp } from '../../../services/signUp';
import { validateAvatar } from '../../../utils/validateAvatar';
import { uploadAvatar } from '../../../services/user';

type Data = {
  username: string;
  email: string;
  password: string;
};

export const useRegisterAccount = () => {
  const { signIn } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [avatar, setAvatar] = useState<undefined | File>();

  const handleSubmitForm = (data: Data) => {
    const { email, password, username } = data;

    if (avatar) {
      if (validateAvatar(avatar) !== true) {
        setError(validateAvatar(avatar) as string);
        return;
      }
    }

    setLoading(true);

    signUp({ email, password, username })
      .then(() => {
        signIn(email, password).then(async () => {
          if (avatar) {
            const formData = new FormData();
            formData.append('file', avatar as File);
            uploadAvatar(formData);
          }
        });
      })
      .catch((err) => {
        setError(err.response.data.message);
      })
      .finally(() => setLoading(false));
    return;
  };

  return {
    avatar,
    loading,
    error,
    handleSubmitForm,
    setAvatar,
  };
};
