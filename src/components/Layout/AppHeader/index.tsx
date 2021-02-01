import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";

import { useAuth } from "~/contexts/auth/AuthContext";
import useNavigate from "~/hooks/useNavigate";
import { PROFILE_ROUTE } from "~/router/routes";

import { HeaderContainer, HeaderUserAvatar } from "./styles";

const Header: React.FC = ({ children, ...rest }) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <HeaderContainer {...rest}>
      {children}

      <TouchableOpacity onPress={navigate(PROFILE_ROUTE)}>
        <HeaderUserAvatar user={user} />
      </TouchableOpacity>
    </HeaderContainer>
  );
};

export default Header;
