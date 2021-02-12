import React from "react";
import { SafeAreaView } from "react-native";
import theme from "~/styles/theme";

import { HeaderContainerView } from "./styles";
import { HeaderContainerProps } from "./types";

const HeaderContainer: React.FC<HeaderContainerProps> = ({
  children,
  backgroundColor = theme.colors.darkSecondary,
}) => {
  const viewStyle = { backgroundColor };

  return (
    <SafeAreaView style={viewStyle}>
      <HeaderContainerView style={viewStyle}>
        {children}
      </HeaderContainerView>
    </SafeAreaView>
  );
};

export default HeaderContainer;
