import { User } from "~/shared/types/apiSchema";

export type HorizontalProvidersListProps = {
  providers?: Array<User>;
  selectedProviderId: User["id"];
  handlePressProvider: (newProvider: User) => () => void;
}
