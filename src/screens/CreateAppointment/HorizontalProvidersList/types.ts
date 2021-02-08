import { User } from "~/shared/types/apiSchema";

export interface HorizontalProvidersListProps {
  providers: Array<User>;
  selectedProviderId: User["id"];
  handlePressProvider: (newProviderId: User["id"]) => () => void;
}
