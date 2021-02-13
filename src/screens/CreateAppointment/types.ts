import { RouteProp } from "@react-navigation/native";
import { User } from "~/shared/types/apiSchema";

export type CreateAppointmentScreenParamsList = {
  CreateAppointment: {
    provider: Pick<User, "id" | "name">;
  };
};

export type CreateAppointmentScreenRouteProp = RouteProp<CreateAppointmentScreenParamsList, "CreateAppointment">;

export type HorizontalFlatListItemProps = {
  isSelected: boolean;
}
