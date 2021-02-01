import styled from "styled-components/native";
import { Platform } from "react-native";
import { getBottomSpace } from "react-native-iphone-x-helper";

export const Container = styled.SafeAreaView`
  flex: 1;
`;

export const Content = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 0 20px;
`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.medium};
  color: ${({ theme }) => theme.colors.white};
  font-size: 24px;
  margin: 64px 0 24px;
`;

export const ForgotPassword = styled.TouchableOpacity`
  margin-top: 24px;
`;

export const ForgotPasswordText = styled.Text`
  color: ${({ theme }) => theme.colors.white};
  font-size: 18px;
  font-family: ${({ theme }) => theme.fonts.regular};
`;

export const CreateAccount = styled.TouchableOpacity`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-top-width: 2px;
  border-top-color: ${({ theme }) => theme.colors.darkSecondary};
  padding: 16px 0 ${Platform.OS === "ios" && `${getBottomSpace() ? getBottomSpace() : 20}px`};
`;

export const CreateAccountText = styled.Text`
  color: ${({ theme }) => theme.colors.yellow};
  font-size: 18px;
  font-family: ${({ theme }) => theme.fonts.regular};
  margin-left: 16px;
`;
