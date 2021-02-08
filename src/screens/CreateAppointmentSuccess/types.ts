import { RouteProp } from "@react-navigation/native";

import { User } from "~/shared/types/apiSchema";

export type CreateAppointmentSuccessScreenParamsList = {
  CreateAppointment: {
    date: Date;
    providerName: User["name"];
  };
};

export type CreateAppointmentSuccessScreenRouteProp = RouteProp<CreateAppointmentSuccessScreenParamsList, "CreateAppointment">;
