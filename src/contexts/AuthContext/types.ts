export type UserProps = {
  username?: string;
  avatar?: string;
  email?: string;
  token?: string;
};

export type DataGoogleLogin = {
  email: string;
  username: string;
};

export type AuthContextProps = {
  signIn: (email: string, password: string) => Promise<void>;
  googleSignIn: (data: DataGoogleLogin) => Promise<void>;
  signed: boolean;
  logout: () => void;
  deleteAccount: () => void;
};
