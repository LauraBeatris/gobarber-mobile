import React, { useState } from "react";
import { useRoute, useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/Feather";

import Header from "~/components/Layout/AppHeader";
import Loading from "~/components/Base/Loading";
import DatePicker from "~/components/Base/DatePicker";
import Button from "~/components/Base/Button";
import { ScreenContainer, Title } from "~/styles/components";
import theme from "~/styles/theme";
import useProviders from "~/hooks/useProviders";
import useDayAvailability from "~/hooks/useDayAvailability";
import { APPOINTMENT_TYPES_LIST } from "~/constants/appointments";
import { AppointmentType, User } from "~/shared/types/apiSchema";

import {
  ScheduleContainer,
  AvailabilitySubtitle,
  AvailabilityContainer,
  ProviderListContainer,
  CreateAppointmentFooter,
  CreateAppointmentContent,
  CreateAppointmentHeaderText,
} from "./styles";
import { CreateAppointmentScreenRouteProp } from "./types";
import HorizontalProvidersList from "./HorizontalProvidersList";
import DayAvailabilityList from "./DayAvailabilityList";
import AppointmentTypeList from "./AppointmentTypeList";

const CreateAppointment: React.FC = () => {
  const { goBack } = useNavigation();
  const { loading: loadingProviders, providers } = useProviders();
  const { providerId } = useRoute<CreateAppointmentScreenRouteProp>().params;

  const [selectedProviderId, setSelectedProviderId] = useState(providerId);
  const [selectedAppointmentType, setSelectedAppointmentType] = useState(
    APPOINTMENT_TYPES_LIST[0].value,
  );
  const [selectedAppointmentDate, setSelectedAppointmentDate] = useState(new Date());
  const [selectedAvailabilityHour, setSelectedAvailabilityHour] = useState<number | null>(null);

  const {
    loading: loadingDayAvailability,
    morningAvailability,
    afternoonAvailability,
  } = useDayAvailability({
    providerId: selectedProviderId,
    appointmentDate: selectedAppointmentDate,
  });

  const handlePressProvider = (newProviderId: User["id"]) => () => {
    setSelectedProviderId(newProviderId);
  };

  const handlePressAvailabilityHour = (hour: number) => () => {
    setSelectedAvailabilityHour(hour);
  };

  const handlePressAppointmentType = (appointmentType: AppointmentType) => () => {
    setSelectedAppointmentType(appointmentType);
  };

  const handleAppointmentDateChange = (value: Date) => {
    setSelectedAppointmentDate(value);
  };

  const shouldEnableButton = (
    !loadingDayAvailability
    && !loadingProviders
    && Boolean(selectedAvailabilityHour)
  );

  return (
    <ScreenContainer>
      <Header>
        <TouchableOpacity onPress={goBack}>
          <Icon
            name="chevron-left"
            size={24}
            color={theme.colors.gray}
          />

        </TouchableOpacity>

        <CreateAppointmentHeaderText>
          Agendamento
        </CreateAppointmentHeaderText>
      </Header>

      <ProviderListContainer>
        {
          loadingProviders ? (
            <Loading size="small" />
          ) : (
            <HorizontalProvidersList
              providers={providers}
              selectedProviderId={selectedProviderId}
              handlePressProvider={handlePressProvider}
            />
          )
        }
      </ProviderListContainer>

      <CreateAppointmentContent>
        <Title>Escolha a data</Title>

        <DatePicker onChange={handleAppointmentDateChange} />
      </CreateAppointmentContent>

      <CreateAppointmentContent>
        <Title>Escolha o horário</Title>
      </CreateAppointmentContent>

      <ScheduleContainer>
        {
          loadingDayAvailability ? (
            <Loading size="small" />
          ) : (
            <>
              <AvailabilityContainer>
                <AvailabilitySubtitle>Manhã</AvailabilitySubtitle>

                <DayAvailabilityList
                  availability={morningAvailability}
                  selectedAvailabilityHour={selectedAvailabilityHour}
                  handlePressAvailabilityHour={handlePressAvailabilityHour}
                />
              </AvailabilityContainer>

              <AvailabilityContainer>
                <AvailabilitySubtitle>Tarde</AvailabilitySubtitle>

                <DayAvailabilityList
                  availability={afternoonAvailability}
                  selectedAvailabilityHour={selectedAvailabilityHour}
                  handlePressAvailabilityHour={handlePressAvailabilityHour}
                />
              </AvailabilityContainer>
            </>
          )
        }
      </ScheduleContainer>

      <CreateAppointmentContent>
        <Title>Escolha o tipo</Title>
      </CreateAppointmentContent>

      <AppointmentTypeList
        selectedAppointmentType={selectedAppointmentType}
        handlePressAppointmentType={handlePressAppointmentType}
      />

      <CreateAppointmentFooter>
        <Button enabled={shouldEnableButton}>
          Agendar
        </Button>
      </CreateAppointmentFooter>
    </ScreenContainer>
  );
};

export default CreateAppointment;
