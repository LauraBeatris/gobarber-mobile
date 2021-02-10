import React, { useRef } from "react";
import { TextInput, Alert } from "react-native";
import { FormHandles } from "@unform/core";
import { Form } from "@unform/mobile";

import Button from "~/components/Base/Button";
import Input from "~/components/Base/Input";
import api from "~/config/api";

import { useNavigation } from "@react-navigation/native";
import AuthScreenLayout from "~/components/Layout/AuthScreenLayout";
import performSchemaValidation from "~/utils/performSchemaValidation";
import schema from "./schema";
import { SignUpFormData } from "./types";

const SignUp: React.FC = () => {
  const navigation = useNavigation();

  const formRef = useRef<FormHandles>(null);
  const emailInputRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);

  const handleSubmit = () => {
    formRef?.current?.submitForm();
  };

  const handleSignUp = async (data: SignUpFormData) => {
    performSchemaValidation({
      formRef,
      schema,
      data,
    })
      .then(() => (
        api.post("/users", { ...data, is_provider: false })
          .then(() => navigation.goBack())
          .catch(() => Alert.alert(
            "Account created",
            "Your account was successfully created, congratulations!",
          ))
      ));
  };

  const handleEmailInputFocus = () => {
    emailInputRef.current?.focus();
  };

  const handlePasswordInputFocus = () => {
    passwordInputRef.current?.focus();
  };

  return (
    <AuthScreenLayout
      title="Create an account"
      footerButtonNavigate={navigation.goBack}
      footerButtonText="Already have an account? Login"
    >
      <Form ref={formRef} onSubmit={handleSignUp}>
        <Input
          name="name"
          icon="user"
          placeholder="Full name"
          returnKeyType="next"
          autoCapitalize="words"
          autoCompleteType="name"
          autoCorrect={false}
          onSubmitEditing={handleEmailInputFocus}
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

        <Button onPress={handleSubmit}>
          Create
        </Button>
      </Form>
    </AuthScreenLayout>
  );
};

export default SignUp;
