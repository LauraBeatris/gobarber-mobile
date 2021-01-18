import React from "react";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/Feather";

import Header from "~/components/Header";
import theme from "~/styles/theme";

import { Container, CreateAppointmentHeaderText } from "./styles";

const CreateAppointment: React.FC = () => {
  const { goBack } = useNavigation();

  return (
    <Container>
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
    </Container>
  );
};

export default CreateAppointment;
