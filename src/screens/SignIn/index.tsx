import React, { useState, useRef } from "react";
import { TextInput, Alert } from "react-native";
import { FormHandles } from "@unform/core";
import { Form } from "@unform/mobile";
import { ValidationError } from "yup";

import Button from "~/components/Button";
import Input from "~/components/Input";
import getValidationErrors from "~/utils/getValidationErrors";
import { FORGOT_PASSWORD_ROUTE, SIGN_UP_ROUTE } from "~/router/routes";
import { useAuth } from "~/contexts/auth/AuthContext";
import AuthScreen from "~/components/Layout/AuthScreenLayout";

import useNavigate from "~/hooks/useNavigate";
import schema from "./schema";
import { SignInFormData } from "./types";

const SignIn: React.FC = () => {
  const { signIn } = useAuth();

  const [loading, setLoading] = useState(false);

  const formRef = useRef<FormHandles>(null);
  const passwordInputRef = useRef<TextInput>(null);

  const navigate = useNavigate();

  const handleSubmit = () => {
    formRef?.current?.submitForm();
  };

  const handleSignIn = async (data: SignInFormData) => {
    try {
      setLoading(true);

      formRef.current?.setErrors({});

      await schema.validate(data, {
        abortEarly: false,
      });

      await signIn(data);
    } catch (error) {
      if (error instanceof ValidationError) {
        const errors = getValidationErrors(error);

        formRef.current?.setErrors(errors);

        return;
      }

      Alert.alert(
        "Authentication Error",
        "It happened an error while trying to authenticate, please verify your credencials",
      );
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordFocus = () => {
    passwordInputRef.current?.focus();
  };

  return (
    <AuthScreen
      title="Login to Platform"
      footerButtonText="Create an account"
      footerButtonNavigate={navigate(SIGN_UP_ROUTE)}
      formBottomButtonText="Forgot password"
      formBottomButtonNavigate={navigate(FORGOT_PASSWORD_ROUTE)}
    >
      <Form ref={formRef} onSubmit={handleSignIn}>
        <Input
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
          returnKeyType="send"
          onSubmitEditing={handleSubmit}
          autoCorrect={false}
          secureTextEntry
        />
      </Form>

      <Button
        enabled={!loading}
        loading={loading}
        onPress={handleSubmit}
      >
        Login
      </Button>
    </AuthScreen>
  );
};

export default SignIn;
