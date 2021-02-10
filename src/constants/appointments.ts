export const daysInWeekBusinessIntervalText = "Monday to Friday";

export const hoursInDayBusinessIntervalText = "8am to 6pm";

export const APPOINTMENT_TYPE = {
  HAIR_CARE: "HAIR_CARE",
  HAIR_WASHING: "HAIR_WASHING",
  CLASSIC_SHAVING: "CLASSIC_SHAVING",
} as const;

export type AppointmentType = keyof typeof APPOINTMENT_TYPE

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

