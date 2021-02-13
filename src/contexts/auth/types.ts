import { User } from "~/shared/types/apiSchema";

export type SignInCredentials = {
  email: string;
  password: string;
}

export type AuthState = {
  user: User;
  token: string;
}

export type AuthContextData = {
  user: User;
  signIn: (credentials: SignInCredentials) => Promise<void>;
  signOut: () => void;
  loading: boolean;
  updateUser: (user: Partial<User>) => Promise<void>;
}
