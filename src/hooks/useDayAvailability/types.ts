import { DayAvailability } from "~/shared/types/apiSchema";

export interface UseDayAvailabilityParameters {
  providerId: number;
  appointmentDate: Date;
}

export interface FormattedDayAvailability extends DayAvailability {
  formattedHour: string;
}
