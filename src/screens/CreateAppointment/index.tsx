import React, { useState } from "react";
import { useRoute } from "@react-navigation/native";
import { setHours } from "date-fns";

import AvatarHeader from "~/components/Layout/Header/AvatarHeader";
import Loading from "~/components/Base/Loading";
import DatePicker from "~/components/Base/DatePicker";
import Button from "~/components/Base/Button";
import { ScreenContainer, Title } from "~/styles/components";
import BackButton from "~/components/Base/Button/BackButton";
import { HeaderTitleText } from "~/components/Layout/Header/TitleHeader/styles";
import useProviders from "~/hooks/api/queries/useProviders";
import useDayAvailability from "~/hooks/api/queries/useDayAvailability";
import { useCreateAppointment } from "~/hooks/api/mutations/useCreateAppointment";
import { APPOINTMENT_TYPES_LIST, AppointmentType } from "~/constants/appointments";
import { User } from "~/shared/types/apiSchema";

import {
  ScheduleContainer,
  AvailabilitySubtitle,
  AvailabilityContainer,
  ProviderListContainer,
  CreateAppointmentFooter,
  CreateAppointmentContent,
} from "./styles";
import { CreateAppointmentScreenRouteProp } from "./types";
import HorizontalProvidersList from "./HorizontalProvidersList";
import DayAvailabilityList from "./DayAvailabilityList";
import AppointmentTypeList from "./AppointmentTypeList";

const CreateAppointment: React.FC = () => {
  const { isLoading: loadingProviders, data: providers } = useProviders();
  const { provider } = useRoute<CreateAppointmentScreenRouteProp>().params;

  const [selectedProvider, setSelectedProvider] = useState(provider);
  const [selectedAppointmentType, setSelectedAppointmentType] = useState(
    APPOINTMENT_TYPES_LIST[0].value,
  );
  const [selectedAppointmentDate, setSelectedAppointmentDate] = useState(new Date());
  const [selectedAvailabilityHour, setSelectedAvailabilityHour] = useState<number | null>(null);

  const {
    isLoading: loadingDayAvailability,
    morningAvailability,
    afternoonAvailability,
  } = useDayAvailability({
    provider_id: selectedProvider.id,
    appointmentDate: selectedAppointmentDate,
  });

  const { isLoading, mutate: createAppointment } = useCreateAppointment(selectedProvider.name);

  const handlePressProvider = (newProvider: User) => () => {
    setSelectedProvider(newProvider);
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

  const handleCreateAppointment = () => {
    if (!selectedAvailabilityHour) {
      return;
    }

    createAppointment({
      date: setHours(selectedAppointmentDate, selectedAvailabilityHour),
      type: selectedAppointmentType,
      provider_id: selectedProvider.id,
    });
  };

  const shouldEnableButton = (
    !loadingDayAvailability
    && !loadingProviders
    && Boolean(selectedAvailabilityHour)
  );

  return (
    <>

      <AvatarHeader>
        <BackButton />

        <HeaderTitleText>
          Agendamento
        </HeaderTitleText>
      </AvatarHeader>
      <ScreenContainer>

        <ProviderListContainer>
          {
            loadingProviders ? (
              <Loading size="small" />
            ) : (
              <HorizontalProvidersList
                providers={providers}
                selectedProviderId={selectedProvider.id}
                handlePressProvider={handlePressProvider}
              />
            )
          }
        </ProviderListContainer>

        <CreateAppointmentContent>
          <Title>Select a date</Title>

          <DatePicker onChange={handleAppointmentDateChange} />
        </CreateAppointmentContent>

        <CreateAppointmentContent>
          <Title>Select an hour</Title>
        </CreateAppointmentContent>

        <ScheduleContainer>
          {
            loadingDayAvailability ? (
              <Loading size="small" />
            ) : (
              <>
                <AvailabilityContainer>
                  <AvailabilitySubtitle>Morning</AvailabilitySubtitle>

                  <DayAvailabilityList
                    availability={morningAvailability}
                    selectedAvailabilityHour={selectedAvailabilityHour}
                    handlePressAvailabilityHour={handlePressAvailabilityHour}
                  />
                </AvailabilityContainer>

                <AvailabilityContainer>
                  <AvailabilitySubtitle>Evening</AvailabilitySubtitle>

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
          <Title>Select a type</Title>
        </CreateAppointmentContent>

        <AppointmentTypeList
          selectedAppointmentType={selectedAppointmentType}
          handlePressAppointmentType={handlePressAppointmentType}
        />

        <CreateAppointmentFooter>
          <Button
            loading={isLoading}
            enabled={shouldEnableButton}
            onPress={handleCreateAppointment}
          >
            Schedule
          </Button>
        </CreateAppointmentFooter>
      </ScreenContainer>
    </>
  );
};

export default CreateAppointment;
