import { AppointmentType } from "~/constants/appointments";
import { User } from "~/shared/types/apiSchema";

export type CreateAppointmentPayload = {
  date: Date;
  type: AppointmentType;
  provider: Pick<User, "id" | "name">;
}
