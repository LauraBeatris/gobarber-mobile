import styled from "styled-components/native";

import { HeaderContainerProps } from "./types";

export const HeaderContainerView = styled.View<HeaderContainerProps>`
  width: 100%;
  padding: 24px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
