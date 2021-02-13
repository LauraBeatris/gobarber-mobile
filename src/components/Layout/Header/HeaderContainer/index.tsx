import React from "react";
import { SafeAreaView } from "react-native";
import { useTheme } from "styled-components";

import { HeaderContainerView } from "./styles";
import { HeaderContainerProps } from "./types";

const HeaderContainer: React.FC<HeaderContainerProps> = ({
  children,
  backgroundColor,
}) => {
  const { colors } = useTheme();
  const viewStyle = {
    backgroundColor: backgroundColor ?? colors.darkSecondary,
  };

  return (
    <SafeAreaView style={viewStyle}>
      <HeaderContainerView style={viewStyle}>
        {children}
      </HeaderContainerView>
    </SafeAreaView>
  );
};

export default HeaderContainer;
