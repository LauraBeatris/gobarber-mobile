import React, { useEffect } from "react";
import { useNavigation, useRoute, useNavigationState } from "@react-navigation/native";
import { useTheme } from "styled-components";
import { format } from "date-fns";
import Icon from "react-native-vector-icons/Feather";

import { CREATE_APPOINTMENT_SUCCESS_ROUTE, DASHBOARD_ROUTE } from "~/router/routes";

import {
  CreateAppointmentSuccessTitle,
  CreateAppointmentSuccessButton,
  CreateAppointmentSuccessContent,
  CreateAppointmentSuccessContainer,
  CreateAppointmentSuccessDescription,
} from "./styles";
import { CreateAppointmentSuccessScreenRouteProp } from "./types";

const CreateAppointmentSuccess: React.FC = () => {
  const theme = useTheme();

  const { date, providerName } = useRoute<CreateAppointmentSuccessScreenRouteProp>().params;
  const { reset } = useNavigation();
  const navigationState = useNavigationState(state => state);

  const formattedDate = format(date, "EEEE, MMMM 'at' HH:mmbbb");

  const navigateToDashboard = () => {
    reset({
      index: 1,
      routes: [
        {
          name: DASHBOARD_ROUTE,
        },
      ],
    });
  };

  useEffect(() => {
    const routes = navigationState.routes.filter(({ name }) => (
      name === CREATE_APPOINTMENT_SUCCESS_ROUTE
    ));

    reset({
      ...navigationState,
      routes,
      index: routes.length - 1,
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reset]);

  return (
    <CreateAppointmentSuccessContainer>
      <CreateAppointmentSuccessContent>
        <Icon name="check" size={70} color={theme.colors.green} />

        <CreateAppointmentSuccessTitle>
          Scheduling complete
        </CreateAppointmentSuccessTitle>

        <CreateAppointmentSuccessDescription>
          {formattedDate}
          {" "}
          with
          {" "}
          {providerName}
        </CreateAppointmentSuccessDescription>

        <CreateAppointmentSuccessButton
          onPress={navigateToDashboard}
          enabled
        >
          Ok
        </CreateAppointmentSuccessButton>
      </CreateAppointmentSuccessContent>
    </CreateAppointmentSuccessContainer>
  );
};

export default CreateAppointmentSuccess;
