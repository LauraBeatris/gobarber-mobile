import React, { useRef } from "react";
import {
  Platform,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import { FormHandles } from "@unform/core";
import { Form } from "@unform/mobile";
import { useTheme } from "styled-components";
import Icon from "react-native-vector-icons/Feather";

import Input from "~/components/Base/Input";
import Button from "~/components/Base/Button";
import TitleHeader from "~/components/Layout/Header/TitleHeader";
import BackButton from "~/components/Base/Button/BackButton";
import SignOutButton from "~/components/Base/Button/SignOutButton";
import performSchemaValidation from "~/utils/performSchemaValidation";

import noop from "~/utils/noop";
import useUpdateProfile from "~/hooks/useUpdateProfile";
import { useAuth } from "~/contexts/auth/AuthContext";

import { useUpdateUserAvatar } from "~/hooks/useUpdateUserAvatar";
import Loading from "~/components/Base/Loading";
import { UpdateProfileMutationData } from "~/api/types";
import {
  Content,
  Container,
  ProfileAvatar,
  ProfileAvatarButton,
  ProfileFormContainer,
  ProfileAvatarContainer,
} from "./styles";
import schema from "./schema";

const Profile: React.FC = () => {
  const { user } = useAuth();
  const { colors } = useTheme();

  const {
    isLoading: loadingUpdateProfile,
    mutate: updateProfile,
  } = useUpdateProfile();
  const {
    isLoading: loadingUpdateUserAvatar,
    updateUserAvatar,
  } = useUpdateUserAvatar();

  const formRef = useRef<FormHandles>(null);
  const emailInputRef = useRef<TextInput>(null);
  const oldPasswordInputRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);
  const passwordConfirmationInputRef = useRef<TextInput>(null);

  const handleSubmit = () => {
    formRef?.current?.submitForm();
  };

  const handleUpdateProfile = (data: UpdateProfileMutationData) => {
    performSchemaValidation({
      formRef,
      schema,
      data,
    })
      .then(() => updateProfile(data))
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

  const { name, avatar_url, email } = user;
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

        <ScrollView keyboardShouldPersistTaps="handled">
          <Content>
            <ProfileAvatarContainer>
              <ProfileAvatar
                name={name}
                avatar_url={avatar_url}
              />

              <ProfileAvatarButton onPress={updateUserAvatar}>
                {
                  loadingUpdateUserAvatar ? (
                    <Loading size={8} color={colors.darkSecondary} />
                  ) : (
                    <Icon name="camera" size={20} />
                  )
                }
              </ProfileAvatarButton>
            </ProfileAvatarContainer>

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
              enabled={!loadingUpdateProfile}
              loading={loadingUpdateProfile}
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
