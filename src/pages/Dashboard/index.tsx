import React from "react";

import DashboardHeader from "./DashboardHeader";
import DashboardProvidersList from "./DashboardProvidersList";

import { Container } from "./styles";

const Dashboard: React.FC = () => (
  <Container>
    <DashboardHeader />
    <DashboardProvidersList />
  </Container>
);

export default Dashboard;
