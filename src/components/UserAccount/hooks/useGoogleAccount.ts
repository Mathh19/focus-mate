import { useGoogleLogin } from '@react-oauth/google';
import { useContext, useState } from 'react';
import { loginWithGoogle } from '../../../services/loginWithGoogle';
import { AuthContext } from '../../../contexts/AuthContext/AuthContext';

export const useGoogleAccount = () => {
  const { googleSignIn } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: (response) => {
      loginWithGoogle(response)
        .then((response) => {
          setLoading(true);
          googleSignIn({
            email: response.email,
            username: response.name,
          })
            .catch((err) => setError(err.response.data.message))
            .finally(() => setLoading(false));
        })
        .catch((err) => console.log(err));
    },
  });

  return {
    loading,
    error,
    handleGoogleLogin,
  };
};
