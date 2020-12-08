import { useEffect, useMemo, useState } from "react";
import { Alert } from "react-native";

import api from "~/config/api";
import { User } from "~/shared/types/apiSchema";

/**
 * Fetch service providers
 */
const useProviders = () => {
  const [providers, setProviders] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProviders = () => api.get("/providers")
    .then(({ data }) => setProviders(data))
    .catch(() => Alert.alert("Error", "Error while fetching providers, please, try again"));

  useEffect(() => {
    fetchProviders()
      .finally(() => setLoading(false));
  }, []);

  const payload = useMemo(() => ({
    providers,
    loading,
    fetchProviders,
  }), [providers, loading]);

  return payload;
};

export default useProviders;
