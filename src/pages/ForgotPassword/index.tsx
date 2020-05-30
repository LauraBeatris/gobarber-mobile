import React, { useContext, useRef } from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  View,
  ScrollView
} from 'react-native';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/mobile';
import { useNavigation } from '@react-navigation/native';
import { ThemeContext } from 'styled-components';
import Icon from 'react-native-vector-icons/Feather';

import Button from '../../components/Button';
import Input from '../../components/Input';
import logo from '../../assets/logo.png';

import {
  Container,
  Content,
  Title,
  SignInButton,
  SignInButtonText
} from './styles';

const ForgotPassword: React.FC = () => {
  const theme = useContext(ThemeContext);
  const navigation = useNavigation();

  const formRef = useRef<FormHandles>(null);

  const handleSubmit = (): void => {
    formRef?.current?.submitForm();
  };

  const handleForgotPasswordRequest = (): void => {
    // TODO - Send account data to API
  };

  const handleNavigationToSignIn = (): void => {
    navigation.goBack();
  };

  return (
    <Container>
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        enabled
      >
        <ScrollView
          contentContainerStyle={{flex: 1}}
          keyboardShouldPersistTaps="handled"
        >
          <Content>
              <Image source={logo} />

              <View>
                <Title>Forgot Password</Title>
              </View>

              <Form
                ref={formRef}
                onSubmit={handleForgotPasswordRequest}
              >
                <Input
                  name="email"
                  icon="mail"
                  placeholder="Email"
                  returnKeyType="send"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCompleteType="email"
                  autoCorrect={false}
                  onSubmitEditing={handleForgotPasswordRequest}
                />

                <Button
                  onPress={handleSubmit}
                >
                  Create
                </Button>
              </Form>
          </Content>
        </ScrollView>
      </KeyboardAvoidingView>

      <SignInButton onPress={handleNavigationToSignIn}>
        <Icon
          name="arrow-left"
          color={theme.colors.white}
          size={16}
        />
        <SignInButtonText>
          Back to login
        </SignInButtonText>
      </SignInButton>
    </Container>
  )
};

export default ForgotPassword;
