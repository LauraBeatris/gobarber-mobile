import React from "react";
import { SafeAreaView } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

import useNavigate from "~/hooks/useNavigate";
import { PROFILE_ROUTE } from "~/router/routes";
import  HeaderContainer from "~/components/Layout/Header/HeaderContainer";

import { HeaderUserAvatar } from "./styles";
import { AvatarHeaderProps } from "./types";

const AvatarHeader: React.FC<AvatarHeaderProps> = ({
  children,
  ...rest
}) => {
  const navigate = useNavigate();

  return (
    <HeaderContainer {...rest}>
      {children}

      <TouchableOpacity onPress={navigate(PROFILE_ROUTE)}>
        <HeaderUserAvatar />
      </TouchableOpacity>
    </HeaderContainer>
  );
};

export default AvatarHeader;
