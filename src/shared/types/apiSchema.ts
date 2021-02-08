import { APPOINTMENT_TYPE } from "~/constants/appointments";

export interface User {
  id: number;
  name: string;
  avatar_url?: string;
}

export interface DayAvailability {
  hour: number;
  available: boolean;
}

export type AppointmentType = keyof typeof APPOINTMENT_TYPE
