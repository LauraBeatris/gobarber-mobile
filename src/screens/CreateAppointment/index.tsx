import React, { useState } from "react";
import { FlatList } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/Feather";

import Header from "~/components/Layout/AppHeader";
import theme from "~/styles/theme";
import useProviders from "~/hooks/useProviders";
import { ScreenContainer } from "~/styles/components";
import { User } from "~/shared/types/apiSchema";
import { keyExtractorId } from "~/constants/flatLists";
import Loading from "~/components/Base/Loading";

import {
  ProviderListItem,
  ProviderListItemName,
  ProviderListContainer,
  ProviderListItemAvatar,
  CreateAppointmentHeaderText,
} from "./styles";
import { CreateAppointmentScreenRouteProp } from "./types";

const CreateAppointment: React.FC = () => {
  const { goBack } = useNavigation();
  const { loading, providers } = useProviders();
  const { providerId } = useRoute<CreateAppointmentScreenRouteProp>().params;
  const [selectedProviderId, setSelectedProviderId] = useState(providerId);

  const handleProviderListItemPress = (newProviderId: number) => () => {
    setSelectedProviderId(newProviderId);
  };

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
          loading ? (
            <Loading size="small" />
          ) : (
            <FlatList<User>
              data={providers}
              renderItem={({ item }) => {
                const isSelected = item.id === selectedProviderId;

                return (
                  <ProviderListItem
                    onPress={handleProviderListItemPress(item.id)}
                    isSelected={isSelected}
                  >
                    <ProviderListItemAvatar user={item} />
                    <ProviderListItemName
                      isSelected={isSelected}
                      numberOfLines={1}
                      ellipsizeMode="tail"
                    >
                      {item.name}
                    </ProviderListItemName>
                  </ProviderListItem>
                );
              }}
              horizontal
              keyExtractor={keyExtractorId}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingHorizontal: 24 }}
            />
          )
        }
      </ProviderListContainer>
    </ScreenContainer>
  );
};

export default CreateAppointment;
