import React from "react";
import { useTheme } from "styled-components";
import { ActivityIndicator, ActivityIndicatorProps } from "react-native";

import { Container } from "./styles";

const Loading: React.FC<ActivityIndicatorProps> = (props) => {
  const theme = useTheme();

  return (
    <Container>
      <ActivityIndicator
        size="large"
        color={theme.colors.white}
        {...props}
      />
    </Container>
  );
};

export default Loading;
