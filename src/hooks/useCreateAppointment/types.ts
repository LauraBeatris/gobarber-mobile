import { AppointmentType, User } from "~/shared/types/apiSchema";

export interface CreateAppointmentPayload {
  date: Date;
  type: AppointmentType;
  providerId: User["id"];
}
