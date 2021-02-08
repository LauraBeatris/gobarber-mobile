import { RectButtonProperties } from "react-native-gesture-handler";

import { FormattedDayAvailability } from "~/hooks/useDayAvailability/types";
import { DayAvailability } from "~/shared/types/apiSchema";
import { HorizontalFlatListItemProps } from "screens/CreateAppointment/types";

export interface DayAvailabilityListProps {
  availability: Array<FormattedDayAvailability>;
  selectedAvailabilityHour: number | null;
  handlePressAvailabilityHour: (hour: number) => () => void;
}

export interface DayAvailabilityFlatListItemProps
extends HorizontalFlatListItemProps, RectButtonProperties {
  available: DayAvailability["available"];
}

export interface DayAvailabilityFlatListItemTextProps {
  available: DayAvailability["available"];
}
