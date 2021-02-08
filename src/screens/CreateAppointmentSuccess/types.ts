import { RouteProp } from "@react-navigation/native";

import { User } from "~/shared/types/apiSchema";

export type CreateAppointmentSuccessScreenParamList = {
  CreateAppointment: {
    date: Date;
    providerName: User["name"];
  };
};

export type CreateAppointmentSuccessScreenRouteProp = RouteProp<CreateAppointmentSuccessScreenParamList, "CreateAppointment">;
