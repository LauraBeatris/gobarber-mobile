import React from "react";
import { ActivityIndicator } from "react-native";
import theme from "~/styles/theme";

import { Container, ButtonText } from "./styles";
import { ButtonProps } from "./types";

const Button: React.FC<ButtonProps> = ({
  children,
  loading,
  ...rest
}) => (
  <Container {...rest}>
    {
      loading ? (
        <ActivityIndicator color={theme.colors.dark} />
      ) : (
        <ButtonText>
          {" "}
          {children}
        </ButtonText>
      )
    }
  </Container>
);

export default Button;
