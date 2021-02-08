import styled from "styled-components/native";

export const ScreenContainer = styled.ScrollView`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.dark};
`;

export const Title = styled.Text`
  color: ${({ theme }) => theme.colors.white};
  font-size: 25px;
  font-family: 'RobotoSlab-Medium';
  margin-bottom: 20px;
`;
