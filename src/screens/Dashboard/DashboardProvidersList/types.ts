import { User } from "~/shared/types/apiSchema";

export type ProviderItemProps = {
  item: User;
}

export type DashboardProvidersListProps = {
  providers?: Array<User>;
  isLoading: boolean;
}
