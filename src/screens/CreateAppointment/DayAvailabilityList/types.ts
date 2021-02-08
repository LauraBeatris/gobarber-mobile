import { FormattedDayAvailability } from "~/hooks/useDayAvailability/types";
import { HorizontalFlatListItemProps } from "screens/CreateAppointment/types";

export interface DayAvailabilityListProps {
  availability: Array<FormattedDayAvailability>;
  availabilityHour: number | null;
  handlePressAvailabilityHour: (hour: number) => () => void;
}

export interface DayAvailabilityFlatListItemProps extends HorizontalFlatListItemProps {
  available: boolean;
}
