import { AppointmentType } from "~/shared/types/apiSchema";

export interface AppointmentTypeListProps {
  selectedAppointmentType: AppointmentType;
  handlePressAppointmentType: (appointmentType: AppointmentType) => () => void;
}
