import React from "react";

import { ScreenContainer } from "~/styles/components";

import DashboardHeader from "./DashboardHeader";
import DashboardProvidersList from "./DashboardProvidersList";

const Dashboard: React.FC = () => (
  <ScreenContainer>
    <DashboardHeader />
    <DashboardProvidersList />
  </ScreenContainer>
);

export default Dashboard;
