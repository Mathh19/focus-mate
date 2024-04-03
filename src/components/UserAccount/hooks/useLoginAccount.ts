import { useContext, useState } from 'react';
import { AuthContext } from '../../../contexts/AuthContext/AuthContext';

type Data = {
  email: string;
  password: string;
};

export const useLoginAccount = () => {
  const { signIn } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmitForm = (data: Data) => {
    const { email, password } = data;

    setLoading(true);

    signIn(email, password)
      .catch((err) => {
        setError(err.response.data.message);
      })
      .finally(() => setLoading(false));
  };

  return {
    loading,
    error,
    handleSubmitForm,
  };
};
