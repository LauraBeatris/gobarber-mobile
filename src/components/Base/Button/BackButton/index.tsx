import React from "react";
import Icon from "react-native-vector-icons/Feather";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "styled-components";

const BackButton: React.FC = () => {
  const { goBack } = useNavigation();
  const theme = useTheme();

  return (
    <TouchableOpacity onPress={goBack}>
      <Icon
        name="chevron-left"
        size={24}
        color={theme.colors.gray}
      />
    </TouchableOpacity>
  );
};

export default BackButton;
