import React, { useState } from "react";
import { FlatList } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/Feather";

import Header from "~/components/Layout/AppHeader";
import Loading from "~/components/Base/Loading";
import useProviders from "~/hooks/useProviders";
import theme from "~/styles/theme";
import { ScreenContainer, Title } from "~/styles/components";
import { User } from "~/shared/types/apiSchema";
import { keyExtractorId } from "~/constants/flatLists";

import DatePicker from "~/components/Base/DatePicker";
import {
  HorizontalFlatListItem,
  ProviderListContainer,
  CreateAppointmentContent,
  HorizontalFlatListItemName,
  HorizontalFlatListItemAvatar,
  CreateAppointmentHeaderText,
} from "./styles";
import { CreateAppointmentScreenRouteProp } from "./types";

const CreateAppointment: React.FC = () => {
  const { goBack } = useNavigation();
  const { loading, providers } = useProviders();
  const { providerId } = useRoute<CreateAppointmentScreenRouteProp>().params;
  const [selectedProviderId, setSelectedProviderId] = useState(providerId);

  const [, setAppointmentDate] = useState(new Date());

  const handleHorizontalFlatListItemPress = (newProviderId: number) => () => {
    setSelectedProviderId(newProviderId);
  };

  const handleAppointmentDateChange = (value: Date) => {
    setAppointmentDate(value);
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
                  <HorizontalFlatListItem
                    onPress={handleHorizontalFlatListItemPress(item.id)}
                    isSelected={isSelected}
                  >
                    <HorizontalFlatListItemAvatar user={item} />
                    <HorizontalFlatListItemName
                      isSelected={isSelected}
                      numberOfLines={1}
                      ellipsizeMode="tail"
                    >
                      {item.name}
                    </HorizontalFlatListItemName>
                  </HorizontalFlatListItem>
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

      <CreateAppointmentContent>
        <Title>Escolha a data</Title>

        <DatePicker onChange={handleAppointmentDateChange} />
      </CreateAppointmentContent>
    </ScreenContainer>
  );
};

export default CreateAppointment;
