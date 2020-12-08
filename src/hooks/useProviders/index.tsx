import { useEffect, useState } from "react";
import { Alert } from "react-native";

import api from "~/config/api";

/**
 * Fetch service providers
 */
const useProviders = () => {
  const [providers, setProviders] = useState([]);

  const fetchProviders = () => (
    api.get("/providers")
      .then(({ data }) => data)
      .catch(() => Alert.alert("Error", "Error while fetching providers, please, try again")));

  useEffect(() => {
    fetchProviders()
      .then((response) => setProviders(response));
  }, []);

  return [providers, fetchProviders];
};

export default useProviders;
