import React from "react";
import Icon from "react-native-vector-icons/Feather";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useTheme } from "styled-components";
import { useAuth } from "~/contexts/auth/AuthContext";

const SignOutButton: React.FC = () => {
  const { signOut } = useAuth();

  const theme = useTheme();

  return (
    <TouchableOpacity onPress={signOut}>
      <Icon
        name="power"
        size={24}
        color={theme.colors.gray}
      />
    </TouchableOpacity>
  );
};

export default SignOutButton;
