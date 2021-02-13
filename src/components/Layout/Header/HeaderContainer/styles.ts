import { Platform } from "react-native";
import styled, { css } from "styled-components/native";

import { HeaderContainerProps } from "./types";

export const HeaderContainerView = styled.View<HeaderContainerProps>`
  width: 100%;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;

  ${Platform.select({
    ios: css`
      padding: 24px;
    `,
    android: css`
      padding: 48px 24px 24px;
    `,
  })}
`;
