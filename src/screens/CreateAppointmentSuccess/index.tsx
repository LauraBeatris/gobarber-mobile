import React from "react";
import Icon from "react-native-vector-icons/Feather";
import { useTheme } from "styled-components";

import {
  CreateAppointmentSuccessTitle,
  CreateAppointmentSuccessButton,
  CreateAppointmentSuccessContent,
  CreateAppointmentSuccessContainer,
  CreateAppointmentSuccessDescription,
} from "./styles";

const CreateAppointmentSuccess: React.FC = () => {
  const theme = useTheme();

  return (
    <CreateAppointmentSuccessContainer>
      <CreateAppointmentSuccessContent>
        <Icon name="check" size={70} color={theme.colors.green} />

        <CreateAppointmentSuccessTitle>
          Agendamento concluído
        </CreateAppointmentSuccessTitle>

        <CreateAppointmentSuccessDescription>
          Terça, dia 14 de março de 2020 às 12:00h
          com Diego Fernandes
        </CreateAppointmentSuccessDescription>

        <CreateAppointmentSuccessButton enabled>
          Ok
        </CreateAppointmentSuccessButton>
      </CreateAppointmentSuccessContent>
    </CreateAppointmentSuccessContainer>
  );
};

export default CreateAppointmentSuccess;
