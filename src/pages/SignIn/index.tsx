import React, { useContext, useRef } from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  View,
  ScrollView,
  TextInput,
  Alert
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/mobile';
import { ThemeContext } from 'styled-components';
import { ValidationError } from 'yup';

import Button from '../../components/Button';
import Input from '../../components/Input';
import logo from '../../assets/logo.png';
import getValidationErrors from '../../utils/getValidationErrors';
import { SIGN_UP_ROUTE, FORGOT_PASSWORD_ROUTE } from '../../router/routes';

import {
  Container,
  Content,
  Title,
  ForgotPassword,
  ForgotPasswordText,
  CreateAccount,
  CreateAccountText
} from './styles';
import schema from './schema';

interface SignInFormData {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const theme = useContext(ThemeContext);
  const navigation = useNavigation();

  const formRef = useRef<FormHandles>(null);
  const passwordInputRef = useRef<TextInput>(null);

  const handleSubmit = (): void => {
    formRef?.current?.submitForm();
  };

  const handleSignIn = async (data: SignInFormData): Promise<void> => {
    try {
      formRef.current?.setErrors({});

      await schema.validate(data, {
        abortEarly: false
      });
    } catch (error) {
      if (error instanceof ValidationError) {
        const errors = getValidationErrors(error);

        formRef.current?.setErrors(errors);

        return;
      };

      Alert.alert(
        'Sigin error',
        `It happened an error during the account sigin,
        please verify your credencials`
      );
    }
  };

  const handleNavigationToSignUp = (): void => {
    navigation.navigate(SIGN_UP_ROUTE);
  };

  const handleNavigationToForgotPassword = (): void => {
    navigation.navigate(FORGOT_PASSWORD_ROUTE);
  };

  const handlePasswordFocus = (): void => {
    passwordInputRef.current?.focus();
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
                onSubmit={handleSignIn}
              >
                <Input
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
                  autoCompleteType="password"
                  textContentType="password"
                  returnKeyType="send"
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
                <ForgotPasswordText
                  onPress={handleNavigationToForgotPassword}
                >
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
