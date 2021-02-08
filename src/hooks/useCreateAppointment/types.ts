import { AppointmentType } from "~/constants/appointments";
import { User } from "~/shared/types/apiSchema";

export interface CreateAppointmentPayload {
  date: Date;
  type: AppointmentType;
  provider: Pick<User, "id" | "name">;
}
