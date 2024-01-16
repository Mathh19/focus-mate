import { TokenResponse } from '@react-oauth/google';
import axios from 'axios';

export const loginWithGoogle = async (
  tokenResponse: Omit<
    TokenResponse,
    'error' | 'error_description' | 'error_uri'
  >,
) => {
  try {
    const response = await axios.get(
      'https://www.googleapis.com/oauth2/v3/userinfo',
      {
        headers: {
          Authorization: `Bearer ${tokenResponse.access_token}`,
        },
      },
    );
    return await response.data;
  } catch (error) {
    console.log(error);
  }
};
