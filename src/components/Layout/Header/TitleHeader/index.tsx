import React from "react";

import HeaderContainer from "~/components/Layout/Header/HeaderContainer";

import { TitleHeaderProps } from "./types";
import { HeaderTitleText } from "./styles";

const TitleHeader: React.FC<TitleHeaderProps> = ({
  title,
  firstTouchable,
  secondTouchable,
  ...rest
}) => (
  <HeaderContainer {...rest}>
    {firstTouchable}

    <HeaderTitleText>
      {title}
    </HeaderTitleText>

    {secondTouchable}
  </HeaderContainer>
);

export default TitleHeader;
