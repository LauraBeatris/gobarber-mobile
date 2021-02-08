import styled from "styled-components/native";
import { transparentize } from "polished";

import { BaseHorizontalFlatListItem } from "~/screens/CreateAppointment/styles";

import { DayAvailabilityFlatListItemProps } from "./types";

export const DayAvailabilityFlatListItemText = styled.Text<DayAvailabilityFlatListItemProps>`
  color: ${({ theme, available }) => (available
    ? theme.colors.shape
    : transparentize(0.5, theme.colors.white))};
`;

export const DayAvailabilityFlatListItem = styled(BaseHorizontalFlatListItem)<DayAvailabilityFlatListItemProps>`
  background-color: ${({ theme, available }) => (available
    ? theme.colors.shape
    : transparentize(0.4, theme.colors.shape))};
`;
