import { DayAvailability } from "~/shared/types/apiSchema";

export type FormattedDayAvailability = DayAvailability & {
  formattedHour: string;
}
