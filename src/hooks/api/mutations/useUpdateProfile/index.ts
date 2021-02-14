import { Alert } from "react-native";
import { useMutation } from "react-query";

import { useAuth } from "~/contexts/auth/AuthContext";
import { updateProfileMutation } from "~/api/mutations";
import { useNavigation } from "@react-navigation/native";
import { DASHBOARD_ROUTE } from "~/router/routes";

/**
 * Updates the user profile on the API and AsyncStorage
 */
const useUpdateProfile = () => {
  const { updateUser } = useAuth();
  const { navigate } = useNavigation();

  const payload = useMutation(updateProfileMutation, {
    onSuccess: async (data) => {
      const { name, email } = data;

      await updateUser({ name, email });

      Alert.alert("Profile successfully updated");

      navigate(DASHBOARD_ROUTE);
    },
  });

  return payload;
};

export default useUpdateProfile;
