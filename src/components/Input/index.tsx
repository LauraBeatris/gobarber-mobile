import React, {
  useContext,
  useEffect,
  useRef,
  forwardRef,
  useImperativeHandle,
} from 'react';
import { useField } from '@unform/core';
import { ThemeContext } from 'styled-components';
import { TextInputProperties, TextInput } from 'react-native';

import { Container, StyledTextInput, Icon } from './styles';

interface InputProps extends TextInputProperties {
  name: string;
  icon: string;
};

interface InputValueRef {
  value: string;
};

interface InputElementRef extends TextInput, InputValueRef {
};

interface InputFowardRef {
  focus(): void;
};

const Input: React.RefForwardingComponent<InputFowardRef, InputProps> = (
  { name, icon, ...rest },
  ref,
) => {
  const inputValueRef = useRef<InputValueRef>({ value: '' });
  const inputElementRef = useRef<InputElementRef>(null);

  const { fieldName, registerField, defaultValue, error } = useField(name);
  const theme = useContext(ThemeContext);

  useEffect(() => {
    registerField<string>({
      name: fieldName,
      ref: inputValueRef.current,
      path: 'value',
      setValue(ref: InputElementRef, value) {
        ref.value = value;
        inputElementRef.current?.setNativeProps({ text: value });
      },
      clearValue(ref: InputElementRef) {
        ref.value = '';
        inputElementRef.current?.clear();
      },
    });
  }, []);

  useImperativeHandle<InputFowardRef, InputFowardRef>(ref, () => ({
    focus: () => {
      inputElementRef.current?.focus();
    }
  }));

  const handleInputChange = (value: InputValueRef['value']): void => {
    inputValueRef.current.value = value;
  };

  return (
    <Container>
      <Icon name={icon} size={20} color={theme.colors.gray} />
      <StyledTextInput
        ref={inputElementRef}
        defaultValue={defaultValue}
        placeholderTextColor={theme.colors.gray}
        onChangeText={handleInputChange}
        {...rest}
      />
    </Container>
  );
};

export default forwardRef(Input);
