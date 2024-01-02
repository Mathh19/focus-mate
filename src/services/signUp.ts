import { api } from './api';

type DataSignUpProps = {
  username: string;
  email: string;
  password: string;
};

export const signUp = async (data: DataSignUpProps) => {
  try {
    const response = await api.post('/auth/register', data);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const uploadAvatar = async (avatar: FormData) => {
  try {
    const response = await api.post('/user/avatar', avatar);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
