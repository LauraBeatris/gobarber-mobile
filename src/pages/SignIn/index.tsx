import React from 'react';
import { Image } from 'react-native';

import Button from '../../components/Button';
import Input from '../../components/Input';

import { Container, Content, Title } from './styles';
import logo from '../../assets/logo.png';

const SignIn: React.FC = () => {
  const handleSubmit = (): void => {

  }

  return (
    <Container>
      <Content>
          <Image source={logo} />
          <Title>Login to Platform</Title>
          <Input name="email" icon="mail" placeholder="Email" />
          <Input name="password" icon="lock" placeholder="Password" />
          <Button onPress={handleSubmit}>Login</Button>
      </Content>
    </Container>
  )
}

export default SignIn;
