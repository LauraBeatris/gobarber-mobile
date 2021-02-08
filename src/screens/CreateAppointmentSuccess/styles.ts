import styled from "styled-components/native";

import Button from "~/components/Base/Button";
import { Title, ScreenContainer } from "~/styles/components";

export const CreateAppointmentSuccessContainer = styled(ScreenContainer).attrs({
  contentContainerStyle: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
  },
})`
  display: flex;
  padding: 0 14px;
`;

export const CreateAppointmentSuccessContent = styled.View`
  align-items: center;
  width: 100%;
`;

export const CreateAppointmentSuccessTitle = styled(Title)`
  text-align: center;
  max-width: 199px;
  margin-top: 30px;
`;

export const CreateAppointmentSuccessDescription = styled.Text`
  color: ${({ theme }) => theme.colors.grayLight};
  font-size: 14px;
  max-width: 265px;
  font-family: 'RobotoSlab-Regular';
  text-align: center;
`;

export const CreateAppointmentSuccessButton = styled(Button)`
  width: 100%;
  margin: auto;
  max-width: 100px;
  margin-top: 40px;
`;
