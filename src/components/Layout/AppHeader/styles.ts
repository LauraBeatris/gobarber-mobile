import styled from "styled-components/native";
import { getStatusBarHeight } from "react-native-iphone-x-helper";

import Avatar from "~/components/Base/Avatar";

export const HeaderContainer = styled.View<AppHeaderProps>`
  width: 100%;
  padding: 24px;
  padding-top: ${getStatusBarHeight() + 24}px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: ${({
    theme,
    backgroundColor,
  }) => backgroundColor || theme.colors.blackMedium};
`;

export const HeaderUserAvatar = styled(Avatar)`
  width: 56px;
  height: 56px;
  border-radius: 28px;
`;