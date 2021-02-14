import { AxiosError } from "axios";
import { Alert } from "react-native";
import { UseMutationOptions, useMutation } from "react-query";

import { createUserMutation } from "~/api/mutations";
import { CreateUserMutationData } from "~/api/types";
import { User } from "~/shared/types/apiSchema";

/**
 * Handles the mutation to create an user
 */
const useCreateUser = (options: UseMutationOptions<User, AxiosError, CreateUserMutationData>) => {
  const payload = useMutation<User, AxiosError, CreateUserMutationData>(createUserMutation, {
    onError: () => Alert.alert(
      "Something went wrong while creating user account. Please, try again.",
    ),
    ...options ?? {},
  });

  return payload;
};

export default useCreateUser;
