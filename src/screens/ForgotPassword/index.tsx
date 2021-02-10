import React, { useRef } from "react";
import { Alert } from "react-native";
import { FormHandles } from "@unform/core";
import { Form } from "@unform/mobile";
import { useNavigation } from "@react-navigation/native";

import Button from "~/components/Base/Button";
import Input from "~/components/Base/Input";

import AuthScreenLayout from "~/components/Layout/AuthScreenLayout";
import performSchemaValidation from "~/utils/performSchemaValidation";
import api from "~/config/api";
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
    performSchemaValidation({
      formRef,
      schema,
      data,
    })
      .then(() => (
        api.post("/password/recover-request", data)
          .then(() => {
            Alert.alert(
              "Recover request email successfully sent",
            );
          })
          .catch(() => Alert.alert(
            "An error occured while sending the forgot password request",
            "Please, verify your email and try it again",
          ))
      ));
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
          onSubmitEditing={handleSubmit}
        />

        <Button onPress={handleSubmit}>Create</Button>
      </Form>
    </AuthScreenLayout>
  );
};

export default ForgotPassword;
