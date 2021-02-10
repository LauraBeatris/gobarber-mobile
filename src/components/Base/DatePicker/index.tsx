import React, { useEffect, useState } from "react";
import { View, Platform } from "react-native";
import { format } from "date-fns";
import DateTimePicker, { Event } from "@react-native-community/datetimepicker";
import { useTheme } from "styled-components";

import Button from "~/components/Base/Button";

import { DatePickerDateText } from "./styles";
import { DatePickerProps } from "./types";

const isIOS = Platform.OS === "ios";
const display = isIOS ? "spinner" : "default";
const now = new Date();

const DatePicker: React.FC<DatePickerProps> = ({ onChange }) => {
  const [value, setValue] = useState<Date>(new Date());
  const [isOpen, setIsOpen] = useState(isIOS);
  const theme = useTheme();

  const handleDatePickerChange = (_event: Event, date?: Date) => {
    if (!isIOS) {
      setIsOpen(false);
    }

    if (!date) {
      return;
    }

    setValue(date);
  };

  useEffect(() => {
    if (!onChange) {
      return;
    }

    onChange(value);
  }, [
    value,
    onChange,
  ]);

  const dateString = format(value, "dd/MM/yyyy");

  return (
    <View>
      {
        !isIOS ? (
          <>
            <DatePickerDateText>{dateString}</DatePickerDateText>
            <Button enabled onPress={() => setIsOpen(true)}>
              Abrir calendário
            </Button>
          </>
        ) : null
      }

      {
        isOpen ? (
          <DateTimePicker
            value={value}
            display={display}
            textColor={theme.colors.white}
            onChange={handleDatePickerChange}
            minimumDate={now}
          />
        ) : null
      }
    </View>
  );
};

export default DatePicker;
