import { useMemo, useState, useCallback } from "react";
import { Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";

import api from "~/config/api";
import { CREATE_APPOINTMENT_SUCCESS_ROUTE } from "~/router/routes";

import { CreateAppointmentPayload } from "./types";

export const useCreateAppointment = () => {
  const [loading, setLoading] = useState(false);
  const { navigate } = useNavigation();

  const createAppointment = useCallback((payload: CreateAppointmentPayload) => {
    setLoading(true);

    const {
      date,
      type,
      providerId: provider_id,
    } = payload;

    api.post("/appointments", {
      date,
      type,
      provider_id,
    })
      .then(() => navigate(CREATE_APPOINTMENT_SUCCESS_ROUTE))
      .catch(() => Alert.alert("Error", "Error while creating appointment, please, try again"))
      .finally(() => setLoading(false));
  }, [navigate]);

  const payload = useMemo(() => ({
    loading,
    createAppointment,
  }), [
    loading,
    createAppointment,
  ]);

  return payload;
};
