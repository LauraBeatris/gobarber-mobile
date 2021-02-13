import React, { useRef } from "react";
import { TextInput, Alert } from "react-native";
import { FormHandles } from "@unform/core";
import { Form } from "@unform/mobile";

import Button from "~/components/Base/Button";
import Input from "~/components/Base/Input";
import { FORGOT_PASSWORD_ROUTE, SIGN_UP_ROUTE } from "~/router/routes";
import { useAuth } from "~/contexts/auth/AuthContext";
import AuthScreen from "~/components/Layout/AuthScreenLayout";

import useNavigate from "~/hooks/useNavigate";
import performSchemaValidation from "~/utils/performSchemaValidation";
import schema from "./schema";
import { SignInFormData } from "./types";

const SignIn: React.FC = () => {
  const { signIn } = useAuth();

  const formRef = useRef<FormHandles>(null);
  const passwordInputRef = useRef<TextInput>(null);

  const navigate = useNavigate();

  const handleSubmit = () => {
    formRef?.current?.submitForm();
  };

  const handleSignIn = async (data: SignInFormData) => {
    performSchemaValidation({
      formRef,
      schema,
      data,
    })
      .then(() => (
        signIn(data)
          .catch(() => Alert.alert(
            "Authentication Error",
            "It happened an error while trying to authenticate, please verify your credencials",
          ))
      ));
  };

  const handlePasswordInputFocus = () => {
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
          onSubmitEditing={handlePasswordInputFocus}
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

      <Button onPress={handleSubmit}>
        Login
      </Button>
    </AuthScreen>
  );
};

export default SignIn;
