import React from "react";
import { FlatList } from "react-native";

import { APPOINTMENT_TYPES_LIST } from "~/constants/appointments";
import { HorizontalFlatListItemText, BaseHorizontalFlatListItem } from "~/screens/CreateAppointment/styles";

import { AppointmentTypeListProps } from "./types";

const AppointmentTypeList: React.FC<AppointmentTypeListProps> = ({
  selectedAppointmentType,
  handlePressAppointmentType,
}) => (
  <FlatList
    data={APPOINTMENT_TYPES_LIST}
    renderItem={({ item }) => {
      const { text, value } = item;

      const isSelected = value === selectedAppointmentType;

      return (
        <BaseHorizontalFlatListItem
          onPress={handlePressAppointmentType(value)}
          isSelected={isSelected}
        >
          <HorizontalFlatListItemText isSelected={isSelected}>
            {text}
          </HorizontalFlatListItemText>
        </BaseHorizontalFlatListItem>
      );
    }}
    horizontal
    keyExtractor={(item) => item.text}
    showsHorizontalScrollIndicator={false}
    contentContainerStyle={{ paddingHorizontal: 24 }}
  />
);

export default AppointmentTypeList;
