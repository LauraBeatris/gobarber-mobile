import React, { useContext, useRef } from 'react';
import { Image, KeyboardAvoidingView, Platform, View, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/mobile';
import { ThemeContext } from 'styled-components';
import Icon from 'react-native-vector-icons/Feather'

import Button from '../../components/Button';
import Input from '../../components/Input';
import logo from '../../assets/logo.png';
import { SIGN_UP_ROUTE } from '../../router/routes';

import {
  Container,
  Content,
  Title,
  ForgotPassword,
  ForgotPasswordText,
  CreateAccount,
  CreateAccountText
} from './styles';

const SignIn: React.FC = () => {
  const theme = useContext(ThemeContext);
  const formRef = useRef<FormHandles>(null);
  const navigation = useNavigation();

  const handleSubmit = (): void => {
    formRef?.current?.submitForm();
  };

  const handleNavigationToSignUp = (): void => {
    navigation.navigate(SIGN_UP_ROUTE);
  };

  const signIn = (): void => {
    // TODO - Send signin data to API
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
                <Title>Login to Platform</Title>
              </View>

              <Form
                ref={formRef}
                onSubmit={signIn}
              >
                <Input
                  name="email"
                  icon="mail"
                  placeholder="Email"
                  returnKeyType="next"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCompleteType="email"
                  autoCorrect={false}
                />
                <Input
                  name="password"
                  icon="lock"
                  placeholder="Password"
                  returnKeyType="send"
                  autoCompleteType="password"
                  onSubmitEditing={handleSubmit}
                  autoCorrect={false}
                  secureTextEntry
                />

                <Button
                  onPress={handleSubmit}
                >
                  Login
                </Button>
              </Form>

              <ForgotPassword>
                <ForgotPasswordText>
                  Forgot password
                </ForgotPasswordText>
              </ForgotPassword>
          </Content>
        </ScrollView>
      </KeyboardAvoidingView>

      <CreateAccount
        onPress={handleNavigationToSignUp}
      >
        <Icon
          name="log-in"
          color={theme.colors.white}
          size={16}
        />
        <CreateAccountText>
          Create an account
        </CreateAccountText>
      </CreateAccount>
    </Container>
  )
};

export default SignIn;
