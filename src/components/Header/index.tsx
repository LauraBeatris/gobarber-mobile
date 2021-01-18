import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";

import { useAuth } from "~/contexts/auth/AuthContext";
import useNavigate from "~/hooks/useNavigate";
import useUserAvatarURI from "~/hooks/useUserAvatarURI";
import { PROFILE_ROUTE } from "~/router/routes";

import { HeaderContainer, HeaderUserAvatar } from "./styles";

const Header: React.FC = ({ children }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const userAvatarURI = useUserAvatarURI(user);

  return (
    <HeaderContainer>
      {children}

      <TouchableOpacity onPress={navigate(PROFILE_ROUTE)}>
        <HeaderUserAvatar source={userAvatarURI} />
      </TouchableOpacity>
    </HeaderContainer>
  );
};

export default Header;
