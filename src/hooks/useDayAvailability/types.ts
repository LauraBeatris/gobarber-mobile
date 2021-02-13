import { DayAvailability } from "~/shared/types/apiSchema";

export type UseDayAvailabilityParameters = {
  providerId: number;
  appointmentDate: Date;
}

export type FormattedDayAvailability = DayAvailability & {
  formattedHour: string;
}
