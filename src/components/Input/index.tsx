import React, { useContext, useEffect, useRef } from 'react';
import { useField } from '@unform/core';
import { ThemeContext } from 'styled-components'
import { TextInputProperties, TextInput } from 'react-native'

import { Container, StyledTextInput, Icon } from './styles';

interface InputProps extends TextInputProperties {
  name: string;
  icon: string;
};

interface InputRefValue {
  value: string
};

const Input: React.FC<InputProps> = ({ name, icon, ...rest }) => {
  const inputValueRef = useRef<InputRefValue>({ value: '' });
  const inputElementRef = useRef<TextInput>(null);

  const { fieldName, registerField, defaultValue, error } = useField(name);
  const theme = useContext(ThemeContext);

  useEffect(() => {
    registerField<string>({
      name: fieldName,
      ref: inputValueRef.current,
      path: 'value',
      setValue(ref: any, value){
        ref.value = value;
        inputElementRef.current?.setNativeProps({ text: value });
      },
      clearValue(ref: any) {
        ref.value = '';
        inputElementRef.current?.clear();
      }
    })
  }, []);

  const handleInputChange = (value: InputRefValue['value']): void => {
    inputValueRef.current.value = value
  };

  return (
    <Container>
      <Icon name={icon} size={20} color={theme.colors.gray}/>
      <StyledTextInput
        ref={inputElementRef}
        defaultValue={defaultValue}
        placeholderTextColor={theme.colors.gray}
        onChangeText={handleInputChange}
        {...rest}
      />
    </Container>
  )
};

export default Input;
