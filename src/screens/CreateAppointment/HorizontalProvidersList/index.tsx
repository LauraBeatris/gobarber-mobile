import React from "react";
import { FlatList } from "react-native";

import { HorizontalFlatListItemAvatar, HorizontalFlatListItemText } from "~/screens/CreateAppointment/styles";
import { keyExtractorId } from "~/constants/flatLists";

import { HorizontalProvidersListProps } from "./types";
import { ProviderFlatListItem } from "./styles";

const HorizontalProvidersList: React.FC<HorizontalProvidersListProps> = ({
  providers,
  selectedProviderId,
  handlePressProvider,
}) => (
  <FlatList
    data={providers}
    renderItem={({ item }) => {
      const isSelected = item.id === selectedProviderId;

      return (
        <ProviderFlatListItem
          onPress={handlePressProvider(item)}
          isSelected={isSelected}
        >
          <HorizontalFlatListItemAvatar />
          <HorizontalFlatListItemText
            isSelected={isSelected}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {item.name}
          </HorizontalFlatListItemText>
        </ProviderFlatListItem>
      );
    }}
    horizontal
    keyExtractor={keyExtractorId}
    showsHorizontalScrollIndicator={false}
    contentContainerStyle={{ paddingHorizontal: 24 }}
  />
);

export default HorizontalProvidersList;
