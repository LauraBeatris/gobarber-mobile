import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";

import { useAuth } from "~/contexts/auth/AuthContext";
import useNavigate from "~/hooks/useNavigate";
import useUserAvatarURI from "~/hooks/useUserAvatarURI";
import { PROFILE_ROUTE } from "~/router/routes";
import {
  Header,
  UserAvatar,
  HeaderText,
  UserNameText,
  GreetingsText,
} from "~/pages/Dashboard/styles";

const DashboardHeader: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const userAvatarURI = useUserAvatarURI(user);

  return (
    <Header>
      <HeaderText>
        <GreetingsText>
          Welcome,
          {" "}
          {"\n"}
        </GreetingsText>
        <UserNameText>
          Laura Beatris
        </UserNameText>
      </HeaderText>

      <TouchableOpacity onPress={navigate(PROFILE_ROUTE)}>
        <UserAvatar source={userAvatarURI} />
      </TouchableOpacity>
    </Header>
  );
};

export default DashboardHeader;
