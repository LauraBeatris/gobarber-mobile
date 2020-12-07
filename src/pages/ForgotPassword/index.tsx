import React, { useContext, useRef } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  View,
  ScrollView,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/Feather";
import { FormHandles } from "@unform/core";
import { Form } from "@unform/mobile";
import { useNavigation } from "@react-navigation/native";
import { ThemeContext } from "styled-components";
import { ValidationError } from "yup";

import Button from "~/components/Button";
import Input from "~/components/Input";
import logo from "~/assets/logo.png";
import getValidationErrors from "~/utils/getValidationErrors";
import schema from "./schema";
import {
  Container,
  Content,
  Title,
  SignInButton,
  SignInButtonText,
} from "./styles";

interface ForgotPasswordFormData {
  email: string;
}

const ForgotPassword: React.FC = () => {
  const theme = useContext(ThemeContext);
  const navigation = useNavigation();

  const formRef = useRef<FormHandles>(null);

  const handleSubmit = (): void => {
    formRef?.current?.submitForm();
  };

  const handleForgotPasswordRequest = async (
    data: ForgotPasswordFormData,
  ): void => {
    try {
      formRef.current?.setErrors({});

      await schema.validate(data, {
        abortEarly: false,
      });
    } catch (error) {
      if (error instanceof ValidationError) {
        const errors = getValidationErrors(error);

        formRef.current?.setErrors(errors);

        return;
      }

      Alert.alert(
        "An error occured while sending the forgot password request",
        "Please, verify your email and try it again",
      );
    }
  };

  const handleNavigationToSignIn = (): void => {
    navigation.goBack();
  };

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

            <View>
              <Title>Forgot Password</Title>
            </View>

            <Form ref={formRef} onSubmit={handleForgotPasswordRequest}>
              <Input
                name="email"
                icon="mail"
                placeholder="Email"
                returnKeyType="send"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCompleteType="email"
                autoCorrect={false}
                onSubmitEditing={handleForgotPasswordRequest}
              />

              <Button onPress={handleSubmit}>Create</Button>
            </Form>
          </Content>
        </ScrollView>
      </KeyboardAvoidingView>

      <SignInButton onPress={handleNavigationToSignIn}>
        <Icon name="arrow-left" color={theme.colors.white} size={16} />
        <SignInButtonText>Back to login</SignInButtonText>
      </SignInButton>
    </Container>
  );
};

export default ForgotPassword;
