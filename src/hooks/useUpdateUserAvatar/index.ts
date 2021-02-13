import { useMemo, useState, useCallback } from "react";
import { Alert } from "react-native";
import { launchImageLibrary } from "react-native-image-picker";

import api from "~/config/api";
import { useAuth } from "~/contexts/auth/AuthContext";

export const useUpdateUserAvatar = () => {
  const [loading, setLoading] = useState(false);

  const { updateUser } = useAuth();

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

      const formData = new FormData();

      formData.append("avatar", {
        uri,
        name,
        type,
      });

      try {
        setLoading(true);

        const { data: { avatar_url } } = await api.patch("/users/avatar", formData);

        updateUser({ avatar_url });
      } catch (error) {
        Alert.alert("Error while updating avatar");
      } finally {
        setLoading(false);
      }
    });
  }, [updateUser]);

  const payload = useMemo(() => ({
    loading,
    updateUserAvatar,
  }), [
    loading,
    updateUserAvatar,
  ]);

  return payload;
};
