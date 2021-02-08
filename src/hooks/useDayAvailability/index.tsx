import {
  useMemo,
  useState,
  useEffect,
  useCallback,
} from "react";
import { Alert } from "react-native";
import {
  format,
  getDate,
  getMonth,
  getYear,
} from "date-fns";

import api from "~/config/api";
import { DayAvailability } from "~/shared/types/apiSchema";

import { UseDayAvailabilityParameters } from "./types";

const formatAvailability = (availability: DayAvailability) => ({
  ...availability,
  formattedHour: format(new Date().setHours(availability.hour), "HH:00"),
});

/**
 * Fetches the day availability according to a given date and provider id
 */
const useDayAvailability = ({
  providerId,
  appointmentDate,
}: UseDayAvailabilityParameters) => {
  const [loading, setLoading] = useState(false);
  const [dayAvailability, setDayAvailability] = useState<DayAvailability[]>([]);

  const fetchAvailability = useCallback(() => {
    setLoading(true);

    api.get(`/providers/${providerId}/day-availability`, {
      params: {
        day: getDate(appointmentDate),
        year: getYear(appointmentDate),
        month: getMonth(appointmentDate) + 1,
      },
    })
      .then(({ data }) => setDayAvailability(data))
      .catch(() => Alert.alert("Error", "Error while fetching day availability, please, try again"))
      .finally(() => setLoading(false));
  },
  [
    providerId,
    appointmentDate,
  ]);
  useEffect(() => {
    fetchAvailability();
  }, [
    providerId,
    appointmentDate,
    fetchAvailability,
  ]);

  const morningAvailability = dayAvailability
    .filter(({ hour }) => hour < 12)
    .map(formatAvailability);
  const afternoonAvailability = dayAvailability
    .filter(({ hour }) => hour >= 12)
    .map(formatAvailability);

  const payload = useMemo(() => ({
    loading,
    morningAvailability,
    afternoonAvailability,
  }), [
    loading,
    morningAvailability,
    afternoonAvailability,
  ]);

  return payload;
};

export default useDayAvailability;
