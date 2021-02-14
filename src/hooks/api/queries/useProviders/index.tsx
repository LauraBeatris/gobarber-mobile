import { Alert } from "react-native";
import { useQuery } from "react-query";

import { getProvidersQuery } from "~/api/queries";
import { User } from "~/shared/types/apiSchema";

/**
 * Fetch service providers
 */
const useProviders = () => {
  const payload = useQuery<Array<User>>("providers", getProvidersQuery, {
    onError: () => Alert.alert("Error", "Error while fetching providers, please, try again"),
  });

  return payload;
};

export default useProviders;
