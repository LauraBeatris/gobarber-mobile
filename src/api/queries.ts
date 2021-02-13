import { getDate, getYear, getMonth } from "date-fns";

import api from "~/config/api";

import { GetDayAvailabilityQueryData } from "./types";

export const getProvidersQuery = async () => {
  const { data } = await api.get("/providers");

  return data;
};

export const getDayAvailabilityQuery = async ({
  provider_id,
  appointmentDate,
}: GetDayAvailabilityQueryData) => {
  const { data } = await api.get(`/providers/${provider_id}/day-availability`, {
    params: {
      day: getDate(appointmentDate),
      year: getYear(appointmentDate),
      month: getMonth(appointmentDate) + 1,
    },
  });

  return data;
};
