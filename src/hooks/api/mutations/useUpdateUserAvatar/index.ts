import { useMemo, useCallback } from "react";
import { Alert } from "react-native";
import { launchImageLibrary } from "react-native-image-picker";
import { useMutation } from "react-query";

import { useAuth } from "~/contexts/auth/AuthContext";
import { updateUserAvatarMutation } from "~/api/mutations";

/**
 *  Updates user avatar on the server and AsyncStorage
 */
export const useUpdateUserAvatar = () => {
  const { updateUser } = useAuth();

  const { mutate, ...rest } = useMutation(updateUserAvatarMutation, {
    onSuccess: async ({ avatar_url }) => {
      await updateUser({ avatar_url });
    },
  });

  const updateUserAvatar = useCallback(() => {
    launchImageLibrary({
      mediaType: "photo",
    }, async (response) => {
      const {
        uri,
        fileName: name,
        type,
        didCancel,
        errorMessage,
      } = response;

      if (errorMessage) {
        Alert.alert("Error while updating avatar");
      }

      if (didCancel || errorMessage) {
        return;
      }

      mutate({
        uri,
        name,
        type,
      });
    });
  }, [mutate]);

  const payload = useMemo(() => ({
    updateUserAvatar,
    ...rest,
  }), [
    rest,
    updateUserAvatar,
  ]);

  return payload;
};
