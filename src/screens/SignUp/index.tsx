import React, { useRef, useState } from "react";
import { TextInput, Alert } from "react-native";
import { FormHandles } from "@unform/core";
import { Form } from "@unform/mobile";
import { ValidationError } from "yup";

import Button from "~/components/Button";
import Input from "~/components/Input";
import getValidationErrors from "~/utils/getValidationErrors";
import api from "~/config/api";

import { useNavigation } from "@react-navigation/native";
import AuthScreenLayout from "~/components/Layout/AuthScreenLayout";
import schema from "./schema";
import { SignUpFormData } from "./types";

const SignUp: React.FC = () => {
  const navigation = useNavigation();

  const formRef = useRef<FormHandles>(null);
  const emailInputRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);

  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    formRef?.current?.submitForm();
  };

  const handleSignUp = async (data: SignUpFormData) => {
    try {
      setLoading(true);

      formRef.current?.setErrors({});

      await schema.validate(data, {
        abortEarly: false,
      });

      await api.post("/users", { ...data, is_provider: false });

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
    } finally {
      setLoading(false);
    }
  };

  const handleEmailFocus = () => {
    emailInputRef.current?.focus();
  };

  const handlePasswordFocus = () => {
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
          returnKeyType="send"
          onSubmitEditing={handleSubmit}
          autoCorrect={false}
          secureTextEntry
        />

        <Button
          enabled={loading}
          loading={loading}
          onPress={handleSubmit}
        >
          Create
        </Button>
      </Form>
    </AuthScreenLayout>
  );
};

export default SignUp;
