import styled from "styled-components/native";

export const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.dark};
`;

export const Content = styled.View`
  flex: 1;
  padding: 20px 40px 40px;
  align-items: center;
`;

export const ProfileFormContainer = styled.View`
  align-items: flex-start;
  justify-content: center;
  margin-bottom: 5%;
`;
