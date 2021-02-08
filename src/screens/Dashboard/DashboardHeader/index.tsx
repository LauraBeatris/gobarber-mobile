import React from "react";

import Header from "~/components/Layout/AppHeader";
import { useAuth } from "~/contexts/auth/AuthContext";
import {
  HeaderInfo,
  UserNameText,
  GreetingsText,
} from "~/screens/Dashboard/styles";

const DashboardHeader: React.FC = () => {
  const { user } = useAuth();

  return (
    <Header>
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
    </Header>
  );
};

export default DashboardHeader;
