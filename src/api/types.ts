import { ImagePickerResponse } from "react-native-image-picker";
import { AppointmentType } from "~/constants/appointments";
import { User } from "~/shared/types/apiSchema";

// Mutation Data
export type CreateAppointmentMutationData = {
  date: Date;
  type: AppointmentType;
  provider_id: User["id"];
}

export type UpdateProfileMutationData = {
  name: string;
  email: string;
  old_password?: string;
  password?: string;
  password_confirmation?: string;
}

export type UpdateUserAvatarMutationData = Pick<ImagePickerResponse, "uri" | "type"> & {
  name: ImagePickerResponse["fileName"];
}

// Query Data
export type GetDayAvailabilityQueryData = {
  provider_id: User["id"];
  appointmentDate: Date;
}

