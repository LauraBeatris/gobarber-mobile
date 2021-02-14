import React, { useRef } from "react";
import { FormHandles } from "@unform/core";
import { Form } from "@unform/mobile";
import { useNavigation } from "@react-navigation/native";

import Button from "~/components/Base/Button";
import Input from "~/components/Base/Input";

import AuthScreenLayout from "~/components/Layout/AuthScreenLayout";
import performSchemaValidation from "~/utils/performSchemaValidation";
import { useCreateRecoverPasswordRequest } from "~/hooks/api/mutations/useCreateRecoverPasswordRequest";
import { CreateRecoverPasswordRequestMutationData } from "~/api/types";

import schema from "./schema";

const ForgotPassword: React.FC = () => {
  const navigation = useNavigation();
  const { isLoading, mutate: createRecoverPasswordRequest } = useCreateRecoverPasswordRequest();

  const formRef = useRef<FormHandles>(null);

  const handleSubmit = () => {
    formRef?.current?.submitForm();
  };

  const handleForgotPasswordRequest = async (
    data: CreateRecoverPasswordRequestMutationData,
  ) => {
    performSchemaValidation({
      formRef,
      schema,
      data,
    })
      .then(() => createRecoverPasswordRequest(data));
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

        <Button
          enabled={!isLoading}
          loading={isLoading}
          onPress={handleSubmit}
        >
          Create
        </Button>
      </Form>
    </AuthScreenLayout>
  );
};

export default ForgotPassword;
