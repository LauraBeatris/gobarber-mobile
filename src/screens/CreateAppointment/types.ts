import { RouteProp } from "@react-navigation/native";

export type CreateAppointmentScreenParamList = {
  CreateAppointment: { providerId: number };
};

export type CreateAppointmentScreenRouteProp = RouteProp<CreateAppointmentScreenParamList, "CreateAppointment">;

export interface HorizontalFlatListItemProps {
  isSelected: boolean;
}
