import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";

import useNavigate from "~/hooks/useNavigate";
import { PROFILE_ROUTE } from "~/router/routes";
import HeaderContainer from "~/components/Layout/Header/HeaderContainer";

import { useAuth } from "~/contexts/auth/AuthContext";
import { HeaderUserAvatar } from "./styles";
import { AvatarHeaderProps } from "./types";

const AvatarHeader: React.FC<AvatarHeaderProps> = ({
  children,
  ...rest
}) => {
  const navigate = useNavigate();
  const { user: { name, avatar_url } } = useAuth();

  return (
    <HeaderContainer {...rest}>
      {children}

      <TouchableOpacity onPress={navigate(PROFILE_ROUTE)}>
        <HeaderUserAvatar name={name} avatar_url={avatar_url} />
      </TouchableOpacity>
    </HeaderContainer>
  );
};

export default AvatarHeader;
