import React, { useState } from "react";
import { RefreshControl } from "react-native";
import { useTheme } from "styled-components";

import useProviders from "~/hooks/useProviders";
import { ScreenContainer } from "~/styles/components";

import DashboardHeader from "./DashboardHeader";
import DashboardProvidersList from "./DashboardProvidersList";

const Dashboard: React.FC = () => {
  const { data: providers, isLoading, refetch } = useProviders();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const theme = useTheme();

  const handleRefresh = () => {
    setIsRefreshing(true);

    refetch()
      .finally(() => setIsRefreshing(false));
  };

  return (
    <>
      <DashboardHeader />
      <ScreenContainer
        refreshControl={(
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={handleRefresh}
            tintColor={theme.colors.white}
          />
        )}
      >
        <DashboardProvidersList
          providers={providers}
          isLoading={isLoading}
        />
      </ScreenContainer>
    </>
  );
};

export default Dashboard;
