import React, {
  useMemo,
  useState,
  useEffect,
  useCallback,
} from "react";
import AsyncStorage from "@react-native-community/async-storage";

import {
  TOKEN_STORAGE_KEY,
  USER_STORAGE_KEY,
} from "~/constants/asyncStorage";
import api, { assignDefaultAuthToken } from "~/config/api";
import { AuthProvider } from "./AuthContext";
import { SignInCredentials, AuthState } from "./types";

const AuthContainer: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>({} as AuthState);
  const [loading, setLoading] = useState(true);

  const signIn = useCallback(async (credentials: SignInCredentials): Promise<
    void
  > => {
    const response = await api.post<AuthState>("sessions", credentials);

    const { user, token } = response.data;

    assignDefaultAuthToken(token);

    AsyncStorage.multiSet([
      [USER_STORAGE_KEY, JSON.stringify(user)],
      [TOKEN_STORAGE_KEY, token],
    ]);

    setData({ user, token });
  }, []);

  const signOut = useCallback(async (): Promise<void> => {
    AsyncStorage.multiRemove([TOKEN_STORAGE_KEY, USER_STORAGE_KEY]);

    setData({} as AuthState);
  }, []);

  const loadStoragedAuthData = useCallback(async (): Promise<void> => {
    const token = await AsyncStorage.getItem(TOKEN_STORAGE_KEY);
    const user = await AsyncStorage.getItem(USER_STORAGE_KEY);

    if (token && user) {
      assignDefaultAuthToken(token);

      setData({ token, user: JSON.parse(user) });
    }

    setLoading(false);
  }, []);

  useEffect(() => {
    loadStoragedAuthData();
  }, [loadStoragedAuthData]);

  const contextValue = useMemo(
    () => ({
      user: data?.user,
      signIn,
      signOut,
      loading,
    }),
    [data, signIn, signOut, loading],
  );

  return (
    <AuthProvider value={contextValue}>
      {children}
    </AuthProvider>
  );
};

export default AuthContainer;
