import React from "react";
import { ActivityIndicator } from "react-native";
import { useTheme } from "styled-components";

import { Container, ButtonText } from "./styles";
import { ButtonProps } from "./types";

const Button: React.FC<ButtonProps> = ({
  children,
  loading,
  ...rest
}) => {
  const { colors } = useTheme();

  return (
    <Container {...rest}>
      {
        loading ? (
          <ActivityIndicator color={colors.dark} />
        ) : (
          <ButtonText>
            {" "}
            {children}
          </ButtonText>
        )
      }
    </Container>
  );
};

export default Button;
