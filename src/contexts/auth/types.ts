import { CreateSessionMutationData } from "~/api/types";
import { User } from "~/shared/types/apiSchema";

export type AuthState = {
  user: User;
  token: string;
}

export type AuthContextData = {
  user: User;
  signIn: (credentials: CreateSessionMutationData) => Promise<void>;
  signOut: () => void;
  isLoading: boolean;
  updateUser: (user: Partial<User>) => Promise<void>;
}
