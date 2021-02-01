import React, { useContext } from "react";
import {
  View,
  Image,
  Platform,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import Icon from "react-native-vector-icons/Feather";
import { ThemeContext } from "styled-components";

import logo from "~/assets/logo.png";

import {
  Title,
  Content,
  Container,
  FooterButton,
  FooterButtonText,
  FormBottomButton,
  AuthFormContainer,
  FormBottomButtonText,
} from "./styles";
import { AuthScreenProps } from "./types";

const AuthScreenLayout: React.FC<AuthScreenProps> = ({
  title,
  children,
  footerButtonText,
  footerButtonNavigate,
  formBottomButtonText,
  formBottomButtonNavigate,
}) => {
  const theme = useContext(ThemeContext);

  return (
    <Container>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        enabled
      >
        <ScrollView
          contentContainerStyle={{ flex: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          <Content>
            <Image source={logo} />

            <AuthFormContainer>
              <View>
                <Title>{title}</Title>
              </View>

              {children}

              {
                formBottomButtonText ? (
                  <FormBottomButton>
                    <FormBottomButtonText onPress={formBottomButtonNavigate}>
                      {formBottomButtonText}
                    </FormBottomButtonText>
                  </FormBottomButton>
                ) : null
              }
            </AuthFormContainer>
          </Content>
        </ScrollView>
      </KeyboardAvoidingView>

      {
        footerButtonText ? (
          <FooterButton onPress={footerButtonNavigate}>
            <Icon name="log-in" color={theme.colors.white} size={16} />
            <FooterButtonText>{footerButtonText}</FooterButtonText>
          </FooterButton>
        ) : null
      }
    </Container>
  );
};

export default AuthScreenLayout;
