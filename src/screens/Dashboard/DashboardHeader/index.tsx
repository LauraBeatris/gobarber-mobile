import React from "react";

import AvatarHeader from "~/components/Layout/Header/AvatarHeader";
import { useAuth } from "~/contexts/auth/AuthContext";
import {
  HeaderInfo,
  UserNameText,
  GreetingsText,
} from "~/screens/Dashboard/styles";

const DashboardHeader: React.FC = () => {
  const { user } = useAuth();

  return (
    <AvatarHeader>
      <HeaderInfo>
        <GreetingsText>
          Welcome,
        </GreetingsText>
        <UserNameText
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {user.name}
        </UserNameText>
      </HeaderInfo>
    </AvatarHeader>
  );
};

export default DashboardHeader;
