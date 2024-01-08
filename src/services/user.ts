import { api } from './api';

type DataUserProps = {
  username?: string;
  password?: string;
};

export const updateUser = async (data: DataUserProps) => {
  try {
    const response = await api.patch('/user', data);
    return response.data;
  } catch (error) {
    console.error('Error update user:', error);
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

export const removeAvatar = async () => {
  try {
    const response = await api.delete('/user/avatar');
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
