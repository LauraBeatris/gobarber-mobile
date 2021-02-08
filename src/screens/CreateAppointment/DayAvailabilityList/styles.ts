import styled, { css } from "styled-components/native";
import { transparentize } from "polished";

import { BaseHorizontalFlatListItem, HorizontalFlatListItemText } from "~/screens/CreateAppointment/styles";

import { DayAvailabilityFlatListItemProps, DayAvailabilityFlatListItemTextProps } from "./types";

export const DayAvailabilityFlatListItemText = styled(HorizontalFlatListItemText)<DayAvailabilityFlatListItemTextProps>`
  ${({ available, theme }) => !available && css`
    color: ${transparentize(0.7, theme.colors.white)};
  `}
`;

export const DayAvailabilityFlatListItem = styled(BaseHorizontalFlatListItem)<DayAvailabilityFlatListItemProps>`
  ${({ available, theme }) => !available && css`
    background: ${transparentize(0.4, theme.colors.shape)};
  `}
`;
