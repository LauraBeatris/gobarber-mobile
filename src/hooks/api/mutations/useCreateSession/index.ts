import AsyncStorage from "@react-native-community/async-storage";
import { AxiosError } from "axios";
import { Alert } from "react-native";
import { useMutation } from "react-query";

import { createSessionMutation } from "~/api/mutations";
import { CreateSessionMutationData } from "~/api/types";
import { assignDefaultAuthToken } from "~/config/api";
import { TOKEN_STORAGE_KEY, USER_STORAGE_KEY } from "~/constants/asyncStorage";
import { Session } from "~/shared/types/apiSchema";

import { UseCreateSessionParameters } from "./types";

const useCreateSession = ({
  onSuccess,
  ...rest
}: UseCreateSessionParameters) => {
  const payload = useMutation<
    Session, AxiosError, CreateSessionMutationData
  >(createSessionMutation, {
    onError: () => Alert.alert("Something went wrong while creating a session. Please, try again."),
    onSuccess: ({ user, token }) => {
      assignDefaultAuthToken(token);

      AsyncStorage.multiSet([
        [USER_STORAGE_KEY, JSON.stringify(user)],
        [TOKEN_STORAGE_KEY, token],
      ]);

      onSuccess?.({ user, token });
    },
    ...rest,
  });

  return payload;
};

export default useCreateSession;
