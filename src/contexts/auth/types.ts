import { User } from "~/shared/types/apiSchema";

export interface SignInCredentials {
  email: string;
  password: string;
}

export interface AuthState {
  user: User;
  token: string;
}

export interface AuthContextData {
  user: User;
  signIn: (credentials: SignInCredentials) => Promise<void>;
  signOut: () => void;
  loading: boolean;
  updateUser: (user: Partial<User>) => Promise<void>;
}
