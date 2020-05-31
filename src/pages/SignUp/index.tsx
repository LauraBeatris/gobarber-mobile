import React, { useContext, useRef } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  View,
  ScrollView,
  TextInput,
  Alert,
} from "react-native";
import { FormHandles } from "@unform/core";
import { Form } from "@unform/mobile";
import { useNavigation } from "@react-navigation/native";
import { ThemeContext } from "styled-components";
import Icon from "react-native-vector-icons/Feather";
import { ValidationError } from "yup";

import Button from "../../components/Button";
import Input from "../../components/Input";
import logo from "../../assets/logo.png";
import getValidationErrors from "../../utils/getValidationErrors";
import api from "../../config/api";

import schema from "./schema";

import {
  Container,
  Content,
  Title,
  SignInButton,
  SignInButtonText,
} from "./styles";

interface SignUpFormData {
  name: string;
  email: string;
  password: string;
}

const SignUp: React.FC = () => {
  const theme = useContext(ThemeContext);
  const navigation = useNavigation();

  const formRef = useRef<FormHandles>(null);
  const emailInputRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);

  const handleSubmit = (): void => {
    formRef?.current?.submitForm();
  };

  const handleSignUp = async (data: SignUpFormData): Promise<void> => {
    try {
      formRef.current?.setErrors({});

      await schema.validate(data, {
        abortEarly: false,
      });

      await api.post("/users", data);

      navigation.goBack();

      Alert.alert(
        "Account created",
        "Your account was successfully created, congratulations!",
      );
    } catch (error) {
      if (error instanceof ValidationError) {
        const errors = getValidationErrors(error);

        formRef.current?.setErrors(errors);

        return;
      }

      Alert.alert(
        "Registration error",
        "It happened an error during the account registration, please verify your data",
      );
    }
  };

  const handleNavigationToSignIn = (): void => {
    navigation.goBack();
  };

  const handleEmailFocus = (): void => {
    emailInputRef.current?.focus();
  };

  const handlePasswordFocus = (): void => {
    passwordInputRef.current?.focus();
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
              <Title>Create an account</Title>
            </View>

            <Form ref={formRef} onSubmit={handleSignUp}>
              <Input
                name="name"
                icon="user"
                placeholder="Full name"
                returnKeyType="next"
                autoCapitalize="words"
                autoCompleteType="name"
                autoCorrect={false}
                onSubmitEditing={handleEmailFocus}
              />
              <Input
                ref={emailInputRef}
                name="email"
                icon="mail"
                placeholder="Email"
                keyboardType="email-address"
                autoCompleteType="email"
                returnKeyType="next"
                autoCapitalize="none"
                onSubmitEditing={handlePasswordFocus}
                autoCorrect={false}
              />
              <Input
                ref={passwordInputRef}
                name="password"
                icon="lock"
                placeholder="Password"
                autoCompleteType="password"
                textContentType="newPassword"
                returnKeyType="send"
                onSubmitEditing={handleSignUp}
                autoCorrect={false}
                secureTextEntry
              />

              <Button onPress={handleSubmit}>Create</Button>
            </Form>
          </Content>
        </ScrollView>
      </KeyboardAvoidingView>

      <SignInButton onPress={handleNavigationToSignIn}>
        <Icon name="arrow-left" color={theme.colors.white} size={16} />
        <SignInButtonText>Already have an account? Login</SignInButtonText>
      </SignInButton>
    </Container>
  );
};

export default SignUp;
