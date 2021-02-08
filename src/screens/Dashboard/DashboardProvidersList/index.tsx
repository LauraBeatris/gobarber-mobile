import React, { useState, useContext } from "react";
import { FlatList, RefreshControl } from "react-native";
import Icon from "react-native-vector-icons/Feather";
import { keyExtractorId } from "~/constants/flatLists";

import useProviders from "~/hooks/useProviders";
import useUserAvatarURI from "~/hooks/useUserAvatarURI";
import useNavigate from "~/hooks/useNavigate";
import { Title } from "~/styles/components";
import { daysInWeekBusinessIntervalText, hoursInDayBusinessIntervalText } from "~/constants/appointments";
import { User } from "~/shared/types/apiSchema";
import { CREATE_APPOINTMENT_ROUTE } from "~/router/routes";

import { ThemeContext } from "styled-components";
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
import { ProviderItemProps } from "./types";

const ProviderItem: React.FC<ProviderItemProps> = ({ item }) => {
  const userAvatarURI = useUserAvatarURI(item);
  const navigate = useNavigate();
  const theme = useContext(ThemeContext);

  return (
    <ProviderContainer onPress={navigate(CREATE_APPOINTMENT_ROUTE, {
      providerId: item.id,
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

const DashboardProvidersList: React.FC = () => {
  const { providers, loading, fetchProviders } = useProviders();
  const [refreshing, setRefreshing] = useState(false);
  const theme = useContext(ThemeContext);

  const handleRefresh = () => {
    setRefreshing(true);

    fetchProviders()
      .finally(() => setRefreshing(false));
  };

  return (
    <Container>
      <Title>Cabeleireiros</Title>

      {
        loading ? (
          <ProvidersListActivityIndicator
            color={theme.colors.white}
            size="large"
          />
        ) : (
          <FlatList<User>
            data={providers}
            refreshControl={(
              <RefreshControl
                refreshing={refreshing}
                onRefresh={handleRefresh}
                tintColor={theme.colors.white}
              />
            )}
            renderItem={({ item }) => <ProviderItem item={item} />}
            keyExtractor={keyExtractorId}
            ListEmptyComponent={(
              <NoProvidersAvailableText>
                No providers available
              </NoProvidersAvailableText>
            )}
            showsVerticalScrollIndicator={false}
          />
        )
      }
    </Container>
  );
};

export default DashboardProvidersList;
