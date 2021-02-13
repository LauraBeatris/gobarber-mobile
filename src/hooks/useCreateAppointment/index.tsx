import { Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useMutation } from "react-query";

import { CREATE_APPOINTMENT_SUCCESS_ROUTE } from "~/router/routes";

import { createAppointmentMutation } from "~/api/mutations";

export const useCreateAppointment = (providerName: string) => {
  const { navigate } = useNavigation();

  const payload = useMutation(createAppointmentMutation, {
    onError: () => Alert.alert("Error", "Error while creating appointment, please, try again"),
    onSuccess: ({ date }) => navigate(CREATE_APPOINTMENT_SUCCESS_ROUTE, {
      date,
      providerName,
    }),
  });

  return payload;
};
