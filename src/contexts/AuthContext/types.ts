export type UserProps = {
  username?: string;
  avatar?: string;
  email?: string;
  token?: string;
};

export type AuthContextProps = {
  signIn: (email: string, password: string) => Promise<void>;
  signed: boolean;
  logout: () => void;
  deleteAccount: () => void;
};
