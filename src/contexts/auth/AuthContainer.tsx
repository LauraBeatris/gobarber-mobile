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
import { assignDefaultAuthToken } from "~/config/api";
import { User } from "~/shared/types/apiSchema";
import useCreateSession from "~/hooks/useCreateSession";
import { CreateSessionMutationData } from "~/api/types";

import { AuthProvider } from "./AuthContext";
import { AuthState } from "./types";

const AuthContainer: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>({} as AuthState);
  const { mutate: createSession, isLoading } = useCreateSession({
    onSuccess: ({ user, token }) => setData({ user, token }),
  });

  const signIn = useCallback(async (credentials: CreateSessionMutationData): Promise<
    void
  > => {
    createSession(credentials);
  }, [createSession]);

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
  }, []);

  const updateUser = useCallback(async (newUserData: Partial<User>) => {
    const updatedUserData = {
      ...data.user,
      ...newUserData,
    };

    setData(prev => ({
      ...prev,
      user: {
        ...prev.user,
        ...newUserData,
      },
    }));

    await AsyncStorage.setItem(USER_STORAGE_KEY, JSON.stringify(updatedUserData));
  }, [data.user]);

  useEffect(() => {
    loadStoragedAuthData();
  }, [loadStoragedAuthData]);

  const contextValue = useMemo(
    () => ({
      user: data?.user,
      signIn,
      signOut,
      isLoading,
      updateUser,
    }),
    [
      data,
      signIn,
      signOut,
      isLoading,
      updateUser,
    ],
  );

  return (
    <AuthProvider value={contextValue}>
      {children}
    </AuthProvider>
  );
};

export default AuthContainer;
