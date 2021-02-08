import { AppointmentType } from "~/constants/appointments";

export interface AppointmentTypeListProps {
  selectedAppointmentType: AppointmentType;
  handlePressAppointmentType: (appointmentType: AppointmentType) => () => void;
}
