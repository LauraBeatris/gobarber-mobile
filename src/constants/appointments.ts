import { AppointmentType } from "~/shared/types/apiSchema";

export const daysInWeekBusinessIntervalText = "Segunda à sexta";

export const hoursInDayBusinessIntervalText = "8h às 18h";

export const APPOINTMENT_TYPE = {
  HAIR_CARE: "HAIR_CARE",
  HAIR_WASHING: "HAIR_WASHING",
  CLASSIC_SHAVING: "CLASSIC_SHAVING",
} as const;

export const APPOINTMENT_TYPES_LIST = [
  {
    text: "Hair Care",
    value: APPOINTMENT_TYPE.HAIR_CARE,
  },
  {
    text: "Hair Washing",
    value: APPOINTMENT_TYPE.HAIR_WASHING,
  },
  {
    text: "Classic Shaving",
    value: APPOINTMENT_TYPE.CLASSIC_SHAVING,
  },
];

