import React from "react";
import { FlatList } from "react-native";
import { keyExtractorId } from "~/constants/flatLists";

import { DayAvailabilityListProps } from "./types";
import { DayAvailabilityFlatListItem, DayAvailabilityFlatListItemText } from "./styles";

const DayAvailabilityList: React.FC<DayAvailabilityListProps> = ({
  availability,
  selectedAvailabilityHour,
  handlePressAvailabilityHour,
}) => (
  <FlatList
    data={availability}
    renderItem={({ item }) => {
      const { hour, available, formattedHour } = item;

      const isSelected = hour === selectedAvailabilityHour;

      return (
        <DayAvailabilityFlatListItem
          onPress={handlePressAvailabilityHour(hour)}
          enabled={available}
          available={available}
          isSelected={isSelected}
        >
          <DayAvailabilityFlatListItemText
            available={available}
            isSelected={isSelected}
          >
            {formattedHour}
          </DayAvailabilityFlatListItemText>
        </DayAvailabilityFlatListItem>
      );
    }}
    horizontal
    keyExtractor={keyExtractorId}
    showsHorizontalScrollIndicator={false}
    contentContainerStyle={{ paddingHorizontal: 24 }}
  />
);

export default DayAvailabilityList;
