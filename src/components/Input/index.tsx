import React, {
  useContext,
  useEffect,
  forwardRef,
  useState,
  useImperativeHandle,
  useRef,
  useMemo,
} from 'react';
import { useField } from '@unform/core';
import { ThemeContext } from 'styled-components';
import { TextInputProperties, TextInput } from 'react-native';

import { Container, StyledTextInput, Icon } from './styles';

interface InputProps extends TextInputProperties {
  name: string;
  icon: string;
}

interface InputValueRef {
  value: string;
}

interface InputElementRef extends TextInput, InputValueRef {}

interface InputFowardRef {
  focus(): void;
}

const Input: React.RefForwardingComponent<InputFowardRef, InputProps> = (
  { name, icon, ...rest },
  ref,
) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

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
    },
  }));

  const handleChange = (value: InputValueRef['value']): void => {
    inputValueRef.current.value = value;
  };

  const handleFocus = (): void => {
    setIsFocused(true);
  };

  const handleBlur = (): void => {
    setIsFocused(false);
    setIsFilled(!!inputValueRef.current?.value);
  };

  const iconColor = useMemo(
    () => (isFilled || isFocused ? theme.colors.yellow : theme.colors.gray),
    [isFocused, isFilled],
  );

  return (
    <Container isFocused={isFocused}>
      <Icon name={icon} size={20} color={iconColor} />
      <StyledTextInput
        ref={inputElementRef}
        defaultValue={defaultValue}
        placeholderTextColor={theme.colors.gray}
        onChangeText={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        {...rest}
      />
    </Container>
  );
};

export default forwardRef(Input);
