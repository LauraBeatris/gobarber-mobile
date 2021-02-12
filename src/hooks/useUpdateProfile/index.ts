import { Alert } from "react-native";
import { useMemo, useState, useCallback } from "react";

import { useAuth } from "~/contexts/auth/AuthContext";
import api from "~/config/api";
import { UpdateProfileFormData } from "~/screens/Profile/types";

/**
 * Updates the user profile on the API and AsyncStorage
 */
const useUpdateProfile = () => {
  const { user, updateUser } = useAuth();
  const [loading, setLoading] = useState(false);

  const updateProfile = useCallback((
    data: UpdateProfileFormData,
    onUpdateProfile: () => void,
  ) => {
    const hasWrittenInvalidOldPassword = (
      data.old_password
      && data.old_password !== user.password
    );

    if (hasWrittenInvalidOldPassword) {
      Alert.alert("Invalid Old Password");

      return;
    }

    setLoading(true);

    api.put("/profile", data)
      .then(async () => {
        const { name, email } = data;

        await updateUser({ name, email });

        Alert.alert("Profile successfully updated");

        onUpdateProfile?.();
      })
      .catch(() => Alert.alert("Error while updating profile. Please, try again later and verify your credentials."))
      .finally(() => setLoading(false));
  }, [
    updateUser,
    user.password,
  ]);

  const payload = useMemo(() => ({
    loading,
    updateProfile,
  }), [
    loading,
    updateProfile,
  ]);

  return payload;
};

export default useUpdateProfile;
