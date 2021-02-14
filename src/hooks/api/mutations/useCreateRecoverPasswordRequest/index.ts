import { Alert } from "react-native";
import { useMutation } from "react-query";

import { createRecoverPasswordRequest } from "~/api/mutations";

export const useCreateRecoverPasswordRequest = () => {
  const payload = useMutation(createRecoverPasswordRequest, {
    onSuccess: () => Alert.alert(
      "Recover request email successfully sent",
    ),
    onError: () => Alert.alert(
      "An error occurred while sending the forgot password request",
      "Please, verify if your email is correct and try it again",
    ),
  });

  return payload;
};
