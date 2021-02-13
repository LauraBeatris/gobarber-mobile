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
import useProviders from "~/hooks/useProviders";
import useDayAvailability from "~/hooks/useDayAvailability";
import { useCreateAppointment } from "~/hooks/useCreateAppointment";
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
  const { loading: loadingProviders, providers } = useProviders();
  const { provider } = useRoute<CreateAppointmentScreenRouteProp>().params;

  const [selectedProviderId, setSelectedProviderId] = useState(provider.id);
  const [selectedAppointmentType, setSelectedAppointmentType] = useState(
    APPOINTMENT_TYPES_LIST[0].value,
  );
  const [selectedAppointmentDate, setSelectedAppointmentDate] = useState(new Date());
  const [selectedAvailabilityHour, setSelectedAvailabilityHour] = useState<number | null>(null);

  const {
    loading: loadingDayAvailability,
    morningAvailability,
    updateDayAvailability,
    afternoonAvailability,
  } = useDayAvailability({
    providerId: selectedProviderId,
    appointmentDate: selectedAppointmentDate,
  });

  const { loading, createAppointment } = useCreateAppointment();

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

  const handleCreateAppointment = () => {
    if (!selectedAvailabilityHour) {
      return;
    }

    updateDayAvailability(selectedAvailabilityHour, false);

    createAppointment({
      date: setHours(selectedAppointmentDate, selectedAvailabilityHour),
      type: selectedAppointmentType,
      provider: {
        ...provider,
        id: selectedProviderId,
      },
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
                selectedProviderId={selectedProviderId}
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
            loading={loading}
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
