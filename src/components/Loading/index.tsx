import React, { useContext } from "react";
import { ThemeContext } from "styled-components";
import { ActivityIndicator } from "react-native";

import { Container } from "./styles";

const Loading: React.FC = () => {
  const theme = useContext(ThemeContext);

  return (
    <Container>
      <ActivityIndicator size="large" color={theme.colors.white} />
    </Container>
  );
};

export default Loading;
