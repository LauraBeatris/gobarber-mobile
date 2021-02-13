import { AppointmentType } from "~/constants/appointments";

export type AppointmentTypeListProps = {
  selectedAppointmentType: AppointmentType;
  handlePressAppointmentType: (appointmentType: AppointmentType) => () => void;
}
