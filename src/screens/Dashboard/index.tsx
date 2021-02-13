import React from "react";

import { ScreenContainer } from "~/styles/components";

import DashboardHeader from "./DashboardHeader";
import DashboardProvidersList from "./DashboardProvidersList";

const Dashboard: React.FC = () => (
  <>
    <DashboardHeader />
    <ScreenContainer>
      <DashboardProvidersList />
    </ScreenContainer>
  </>
);

export default Dashboard;
