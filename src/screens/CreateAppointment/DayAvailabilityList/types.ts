import { RectButtonProperties } from "react-native-gesture-handler";

import { FormattedDayAvailability } from "~/hooks/useDayAvailability/types";
import { DayAvailability } from "~/shared/types/apiSchema";
import { HorizontalFlatListItemProps } from "screens/CreateAppointment/types";

export type DayAvailabilityListProps = {
  availability: Array<FormattedDayAvailability>;
  selectedAvailabilityHour: number | null;
  handlePressAvailabilityHour: (hour: number) => () => void;
}

export type DayAvailabilityFlatListItemProps = (
  HorizontalFlatListItemProps
  & RectButtonProperties & {
  available: DayAvailability["available"];
})

export type DayAvailabilityFlatListItemTextProps = {
  available: DayAvailability["available"];
}
