/* eslint-disable no-param-reassign */
import React, {
  useRef,
  useMemo,
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";
import { useField } from "@unform/core";
import { useTheme } from "styled-components";

import {
  ERROR,
  FILLED,
  DEFAULT,
  FOCUSED,
} from "~/constants/inputStates";
import getInputStateColor, {
  InputStates,
} from "~/constants/inputStateColors";
import { Container, StyledTextInput, Icon } from "./styles";
import {
  InputProps,
  InputValueRef,
  InputForwardRef,
  InputElementRef,
} from "./types";

const Input: React.RefForwardingComponent<InputForwardRef, InputProps> = (
  {
    name,
    icon,
    containerStyle,
    ...rest
  },
  ref,
) => {
  const [inputState, setInputState] = useState<InputStates>(DEFAULT);

  const inputValueRef = useRef<InputValueRef>({ value: "" });
  const inputElementRef = useRef<InputElementRef>(null);

  const {
    error,
    fieldName,
    registerField,
    defaultValue,
  } = useField(name);
  const theme = useTheme();

  useEffect(() => {
    inputValueRef.current.value = defaultValue;
  }, [defaultValue, inputValueRef]);

  useEffect(() => {
    registerField<string>({
      name: fieldName,
      ref: inputValueRef.current,
      path: "value",
      setValue(inputRef: InputElementRef, value) {
        inputRef.value = value;
        inputElementRef.current?.setNativeProps({ text: value });
      },
      clearValue(inputRef: InputElementRef) {
        inputRef.value = "";
        inputElementRef.current?.clear();
      },
    });
  }, [fieldName, registerField]);

  useImperativeHandle<InputForwardRef, InputForwardRef>(ref, () => ({
    focus: () => {
      inputElementRef.current?.focus();
    },
  }));

  const handleChange = (value: InputValueRef["value"]): void => {
    inputValueRef.current.value = value;
  };

  const handleFocus = (): void => {
    setInputState(FOCUSED);
  };

  const handleBlur = (): void => {
    if (!error) {
      if (inputValueRef.current?.value) {
        setInputState(FILLED);
      } else {
        setInputState(DEFAULT);
      }
    }
  };

  const inputStateColor = useMemo(() => getInputStateColor(inputState), [
    inputState,
  ]);

  useEffect(() => {
    if (error) {
      setInputState(ERROR);
    }
  }, [error]);

  return (
    <Container style={containerStyle} inputStateColor={inputStateColor}>
      <Icon name={icon} size={20} color={inputStateColor} />
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
