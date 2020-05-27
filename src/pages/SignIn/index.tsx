import React, { useContext } from 'react';
import { Image, KeyboardAvoidingView, Platform, View, ScrollView } from 'react-native';
import { ThemeContext } from 'styled-components';
import Icon from 'react-native-vector-icons/Feather'

import Button from '../../components/Button';
import Input from '../../components/Input';

import {
  Container,
  Content,
  Title,
  ForgotPassword,
  ForgotPasswordText,
  CreateAccount,
  CreateAccountText
} from './styles';
import logo from '../../assets/logo.png';

const SignIn: React.FC = () => {
  const theme = useContext(ThemeContext);

  const handleSubmit = (): void => {

  }

  return (
    <Container>
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        enabled
      >
        <ScrollView contentContainerStyle={{flex: 1}}>
          <Content>
              <Image source={logo} />

              <View>
                <Title>Login to Platform</Title>
              </View>

              <Input
                name="email"
                icon="mail"
                placeholder="Email"
                returnKeyType="next"
                autoCapitalize="none"
                autoCompleteType="email"
              />
              <Input
                name="password"
                icon="lock"
                placeholder="Password"
                returnKeyType="done"
                autoCompleteType="password"
              />
              <Button onPress={handleSubmit}>Login</Button>

              <ForgotPassword>
                <ForgotPasswordText>Forgot password</ForgotPasswordText>
              </ForgotPassword>
          </Content>
        </ScrollView>
      </KeyboardAvoidingView>

      <CreateAccount>
        <Icon name="log-in" color={theme.colors.white} size={16}/>
        <CreateAccountText>Create an account</CreateAccountText>
      </CreateAccount>
    </Container>
  )
}

export default SignIn;
