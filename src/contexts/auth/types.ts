export interface SignInCredentials {
  email: string;
  password: string;
}

export interface AuthState {
  user: object;
  token: string;
}

export interface AuthContextData {
  user: object;
  signIn: (credentials: SignInCredentials) => Promise<void>;
  signOut: () => void;
}
