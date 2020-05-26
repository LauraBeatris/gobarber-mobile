import React from 'react';
import { SafeAreaView, Image, Text } from 'react-native';

import logo from '../../assets/logo.png';
import { Container, Title } from './styles';

const SignIn: React.FC = () => (
    <Container>
      <Image source={logo} />
      <Title>Login to Platform</Title>
    </Container>
)

export default SignIn;
