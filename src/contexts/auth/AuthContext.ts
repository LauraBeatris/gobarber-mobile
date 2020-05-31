import { createContext, useContext } from "react";

import { AuthContextData } from "./types";

export const AuthContext = createContext<AuthContextData>(
  {} as AuthContextData,
);

export const AuthProvider = AuthContext.Provider;

export const useAuth = (): AuthContextData => useContext(AuthContext);
