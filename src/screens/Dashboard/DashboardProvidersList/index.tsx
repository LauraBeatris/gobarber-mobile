import React from "react";
import { FlatList } from "react-native";
import Icon from "react-native-vector-icons/Feather";
import { useTheme } from "styled-components";

import { keyExtractorId } from "~/constants/flatLists";
import { daysInWeekBusinessIntervalText, hoursInDayBusinessIntervalText } from "~/constants/appointments";
import useUserAvatarURI from "~/hooks/api/queries/useUserAvatarURI";
import useNavigate from "~/hooks/useNavigate";
import { Title } from "~/styles/components";
import { User } from "~/shared/types/apiSchema";
import { CREATE_APPOINTMENT_ROUTE } from "~/router/routes";

import {
  Container,
  ProviderInfo,
  ProviderName,
  ProviderAvatar,
  ProviderSchedule,
  ProviderContainer,
  ProviderScheduleText,
  NoProvidersAvailableText,
  ProvidersListActivityIndicator,
} from "./styles";
import { ProviderItemProps, DashboardProvidersListProps } from "./types";

const ProviderItem: React.FC<ProviderItemProps> = ({ item }) => {
  const userAvatarURI = useUserAvatarURI(item);
  const navigate = useNavigate();
  const theme = useTheme();

  const { id, name } = item;

  return (
    <ProviderContainer onPress={navigate(CREATE_APPOINTMENT_ROUTE, {
      provider: {
        id,
        name,
      },
    })}
    >
      <ProviderAvatar source={userAvatarURI} />

      <ProviderInfo>
        <ProviderName
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {item.name}
        </ProviderName>

        <ProviderSchedule>
          <Icon
            name="calendar"
            color={theme.colors.yellow}
            size={15}
          />

          <ProviderScheduleText>
            {daysInWeekBusinessIntervalText}
          </ProviderScheduleText>
        </ProviderSchedule>

        <ProviderSchedule>
          <Icon
            name="clock"
            color={theme.colors.yellow}
            size={15}
          />

          <ProviderScheduleText>
            {hoursInDayBusinessIntervalText}
          </ProviderScheduleText>
        </ProviderSchedule>
      </ProviderInfo>
    </ProviderContainer>
  );
};

const DashboardProvidersList: React.FC<DashboardProvidersListProps> = ({
  providers,
  isLoading,
}) => {
  const theme = useTheme();

  return (
    <Container>
      <Title>Hairdressers</Title>

      {
        isLoading ? (
          <ProvidersListActivityIndicator
            color={theme.colors.white}
            size="large"
          />
        ) : (
          <FlatList<User>
            data={providers}
            renderItem={({ item }) => <ProviderItem item={item} />}
            keyExtractor={keyExtractorId}
            ListEmptyComponent={(
              <NoProvidersAvailableText>
                No providers available
              </NoProvidersAvailableText>
            )}
            showsVerticalScrollIndicator={false}
            nestedScrollEnabled
          />
        )
      }
    </Container>
  );
};

export default DashboardProvidersList;
