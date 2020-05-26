import React, { useContext } from 'react';
import { ThemeContext } from 'styled-components'
import { TextInputProperties } from 'react-native'

import { Container, TextInput, Icon } from './styles';

interface InputProps extends TextInputProperties {
  name: string;
  icon: string;
}

const Input: React.FC<InputProps> = ({ name, icon, ...rest }) => {
  const theme = useContext(ThemeContext);

  return (
    <Container>
      <Icon name={icon} size={20} color={theme.colors.gray}/>
      <TextInput
        placeholderTextColor={theme.colors.gray}
        {...rest}
      />
    </Container>
  )
}

export default Input;
