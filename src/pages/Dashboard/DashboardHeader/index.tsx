import React from "react";

import Header from "~/components/Header";
import { useAuth } from "~/contexts/auth/AuthContext";
import {
  HeaderInfo,
  UserNameText,
  GreetingsText,
} from "~/pages/Dashboard/styles";

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
