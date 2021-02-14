import { useEffect, useMemo } from "react";
import { Alert } from "react-native";
import { useQuery } from "react-query";
import { format } from "date-fns";

import { DayAvailability } from "~/shared/types/apiSchema";

import { getDayAvailabilityQuery } from "~/api/queries";
import { GetDayAvailabilityQueryData } from "~/api/types";

const formatAvailability = (availability: DayAvailability) => ({
  ...availability,
  formattedHour: format(new Date().setHours(availability.hour), "HH:00"),
});

/**
 * Fetches the day availability according to a given date and provider id
 */
const useDayAvailability = ({
  provider_id,
  appointmentDate,
}: GetDayAvailabilityQueryData) => {
  const { data = [], refetch, ...rest } = useQuery<Array<DayAvailability>>("day-availability", () => getDayAvailabilityQuery({
    provider_id,
    appointmentDate,
  }), {
    enabled: false,
    onError: () => Alert.alert("Error", "Error while fetching day availability, please, try again"),
  });

  const morningAvailability = data
    .filter(({ hour }) => hour < 12)
    .map(formatAvailability);
  const afternoonAvailability = data
    .filter(({ hour }) => hour >= 12)
    .map(formatAvailability);

  useEffect(() => {
    if (!appointmentDate) {
      return;
    }

    refetch();
  }, [
    refetch,
    provider_id,
    appointmentDate,
  ]);

  const payload = useMemo(() => ({
    morningAvailability,
    afternoonAvailability,
    ...rest,
  }), [
    morningAvailability,
    afternoonAvailability,
    rest,
  ]);

  return payload;
};

export default useDayAvailability;
