import React, { useRef, useState } from "react";
import {
  Alert,
  Platform,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import { FormHandles } from "@unform/core";
import { Form } from "@unform/mobile";
import { useTheme } from "styled-components";

import Input from "~/components/Base/Input";
import Button from "~/components/Base/Button";
import TitleHeader from "~/components/Layout/Header/TitleHeader";
import BackButton from "~/components/Base/Button/BackButton";
import SignOutButton from "~/components/Base/Button/SignOutButton";
import { useAuth } from "~/contexts/auth/AuthContext";
import performSchemaValidation from "~/utils/performSchemaValidation";
import api from "~/config/api";

import noop from "~/utils/noop";
import { DASHBOARD_ROUTE } from "~/router/routes";
import { useNavigation } from "@react-navigation/native";
import { Content, Container, ProfileFormContainer } from "./styles";
import { UpdateProfileFormData } from "./types";
import schema from "./schema";

const Profile: React.FC = () => {
  const { colors } = useTheme();
  const { user, updateUser } = useAuth();
  const { navigate } = useNavigation();

  const formRef = useRef<FormHandles>(null);
  const emailInputRef = useRef<TextInput>(null);
  const oldPasswordInputRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);
  const passwordConfirmationInputRef = useRef<TextInput>(null);

  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    formRef?.current?.submitForm();
  };

  const handleUpdateProfile = (data: UpdateProfileFormData) => {
    const {
      password_confirmation: _password_confirmation,
      old_password,
      ...rest
    } = data;

    const hasWrittenInvalidOldPassword = old_password !== user.password;

    if (hasWrittenInvalidOldPassword) {
      Alert.alert("Invalid Old Password");

      return;
    }

    performSchemaValidation({
      formRef,
      schema,
      data,
    })
      .then(() => {
        setLoading(true);

        api.put("/profile", data)
          .then(async () => {
            await updateUser(rest);

            Alert.alert("Profile successfully updated");

            navigate(DASHBOARD_ROUTE);
          })
          .catch(() => Alert.alert("Error while updating profile. Please, try again later and verify your credentials."))
          .finally(() => setLoading(false));
      })
      .catch(noop);
  };

  const handleEmailInputFocus = () => {
    emailInputRef.current?.focus();
  };

  const handleOldPasswordInputFocus = () => {
    oldPasswordInputRef.current?.focus();
  };

  const handlePasswordInputFocus = () => {
    passwordInputRef.current?.focus();
  };

  const handlePasswordConfirmationInputFocus = () => {
    passwordConfirmationInputRef.current?.focus();
  };

  const { name, email } = user;
  const initialData = { name, email };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      enabled
    >
      <Container>
        <TitleHeader
          title="My Profile"
          firstTouchable={<BackButton />}
          secondTouchable={<SignOutButton />}
          backgroundColor={colors.dark}
        />

        <ScrollView
          contentContainerStyle={{ flex: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          <Content>
            <ProfileFormContainer>
              <Form
                ref={formRef}
                onSubmit={handleUpdateProfile}
                initialData={initialData}
              >
                <Input
                  name="name"
                  icon="user"
                  placeholder="Full Name"
                  autoCorrect={false}
                  returnKeyType="next"
                  autoCapitalize="words"
                  onSubmitEditing={handleEmailInputFocus}
                  autoCompleteType="name"
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
                  onSubmitEditing={handleOldPasswordInputFocus}
                  autoCorrect={false}
                />

                <Input
                  ref={oldPasswordInputRef}
                  name="old_password"
                  icon="lock"
                  placeholder="Current Password"
                  returnKeyType="send"
                  onSubmitEditing={handlePasswordInputFocus}
                  autoCorrect={false}
                  containerStyle={{ marginTop: 20 }}
                  secureTextEntry
                />
                <Input
                  ref={passwordInputRef}
                  name="password"
                  icon="lock"
                  placeholder="New Password"
                  returnKeyType="send"
                  onSubmitEditing={handlePasswordConfirmationInputFocus}
                  autoCorrect={false}
                  secureTextEntry
                />
                <Input
                  ref={passwordConfirmationInputRef}
                  name="password_confirmation"
                  icon="lock"
                  placeholder="Password Confirmation"
                  returnKeyType="send"
                  onSubmitEditing={handleSubmit}
                  autoCorrect={false}
                  secureTextEntry
                />
              </Form>
            </ProfileFormContainer>

            <Button
              enabled={!loading}
              onPress={handleSubmit}
            >
              Confirm changes
            </Button>
          </Content>
        </ScrollView>
      </Container>
    </KeyboardAvoidingView>
  );
};

export default Profile;
