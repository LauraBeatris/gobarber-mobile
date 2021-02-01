import React, { useRef } from "react";
import { Alert } from "react-native";
import { FormHandles } from "@unform/core";
import { Form } from "@unform/mobile";
import { useNavigation } from "@react-navigation/native";
import { ValidationError } from "yup";

import Button from "~/components/Base/Button";
import Input from "~/components/Base/Input";
import getValidationErrors from "~/utils/getValidationErrors";

import AuthScreenLayout from "~/components/Layout/AuthScreenLayout";
import schema from "./schema";
import { ForgotPasswordFormData } from "./types";

const ForgotPassword: React.FC = () => {
  const navigation = useNavigation();

  const formRef = useRef<FormHandles>(null);

  const handleSubmit = () => {
    formRef?.current?.submitForm();
  };

  const handleForgotPasswordRequest = async (
    data: ForgotPasswordFormData,
  ) => {
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

  return (
    <AuthScreenLayout
      title="Forgot Password"
      footerButtonText="Back to login"
      footerButtonNavigate={navigation.goBack}
    >
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
        />

        <Button onPress={handleSubmit}>Create</Button>
      </Form>
    </AuthScreenLayout>
  );
};

export default ForgotPassword;
