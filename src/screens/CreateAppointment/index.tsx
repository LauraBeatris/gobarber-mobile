import React, { useState } from "react";
import { useRoute, useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/Feather";

import Header from "~/components/Layout/AppHeader";
import Loading from "~/components/Base/Loading";
import DatePicker from "~/components/Base/DatePicker";
import theme from "~/styles/theme";
import { ScreenContainer, Title } from "~/styles/components";
import useProviders from "~/hooks/useProviders";
import useDayAvailability from "~/hooks/useDayAvailability";

import Button from "~/components/Base/Button";
import { User } from "~/shared/types/apiSchema";
import {
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

const CreateAppointment: React.FC = () => {
  const { goBack } = useNavigation();
  const { loading: loadingProviders, providers } = useProviders();
  const { providerId } = useRoute<CreateAppointmentScreenRouteProp>().params;

  const [availabilityHour, setAvailabilityHour] = useState<number | null>(null);
  const [appointmentDate, setAppointmentDate] = useState(new Date());
  const [selectedProviderId, setSelectedProviderId] = useState(providerId);

  const {
    loading: loadingDayAvailability,
    morningAvailability,
    afternoonAvailability,
  } = useDayAvailability({
    providerId,
    appointmentDate,
  });

  const handlePressProvider = (newProviderId: User["id"]) => () => {
    setSelectedProviderId(newProviderId);
  };

  const handlePressAvailabilityHour = (hour: number) => () => {
    setAvailabilityHour(hour);
  };

  const handleAppointmentDateChange = (value: Date) => {
    setAppointmentDate(value);
  };

  const shouldEnableButton = !loadingDayAvailability && !loadingProviders;

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

      {
        loadingDayAvailability ? (
          <Loading size="small" />
        ) : (
          <>
            <AvailabilityContainer>
              <AvailabilitySubtitle>Manhã</AvailabilitySubtitle>

              <DayAvailabilityList
                availability={morningAvailability}
                availabilityHour={availabilityHour}
                handlePressAvailabilityHour={handlePressAvailabilityHour}
              />
            </AvailabilityContainer>

            <AvailabilityContainer>
              <AvailabilitySubtitle>Tarde</AvailabilitySubtitle>

              <DayAvailabilityList
                availability={afternoonAvailability}
                availabilityHour={availabilityHour}
                handlePressAvailabilityHour={handlePressAvailabilityHour}
              />
            </AvailabilityContainer>
          </>
        )
      }

      <CreateAppointmentFooter>
        <Button enabled={shouldEnableButton}>
          Agendar
        </Button>
      </CreateAppointmentFooter>
    </ScreenContainer>
  );
};

export default CreateAppointment;
