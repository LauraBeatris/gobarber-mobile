import React, { useContext, useRef } from 'react';
import { Image, KeyboardAvoidingView, Platform, View, ScrollView } from 'react-native';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/mobile';
import { useNavigation } from '@react-navigation/native';
import { ThemeContext } from 'styled-components';
import Icon from 'react-native-vector-icons/Feather'

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

const SignUp: React.FC = () => {
  const theme = useContext(ThemeContext);
  const formRef = useRef<FormHandles>(null);
  const navigation = useNavigation();

  const handleSubmit = (): void => {
    formRef?.current?.submitForm();
  };

  const handleNavigationToSignIn = (): void => {
    navigation.goBack();
  };

  const signUp = (): void => {
    // TODO - Send account data to API
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
                <Title>Create an account</Title>
              </View>

              <Form
                ref={formRef}
                onSubmit={signUp}
              >
                <Input
                  name="name"
                  icon="user"
                  placeholder="Full name"
                  returnKeyType="next"
                  autoCapitalize="words"
                  autoCompleteType="name"
                  autoCorrect={false}
                />
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
                  textContentType="newPassword"
                  secureTextEntry
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
          Already have an account? Login
        </SignInButtonText>
      </SignInButton>
    </Container>
  )
};

export default SignUp;
