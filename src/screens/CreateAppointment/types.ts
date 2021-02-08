import { RouteProp } from "@react-navigation/native";
import { User } from "~/shared/types/apiSchema";

export type CreateAppointmentScreenParamList = {
  CreateAppointment: { providerId: User["id"] };
};

export type CreateAppointmentScreenRouteProp = RouteProp<CreateAppointmentScreenParamList, "CreateAppointment">;

export interface HorizontalFlatListItemProps {
  isSelected: boolean;
}
