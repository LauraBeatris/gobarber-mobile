import { AxiosError } from "axios";
import { UseMutationOptions } from "react-query";

import { CreateSessionMutationData } from "~/api/types";
import { Session } from "~/shared/types/apiSchema";

export type UseCreateSessionParameters = Omit<UseMutationOptions<
  Session, AxiosError, CreateSessionMutationData
>, "onSuccess"> & {
  onSuccess: (session: Session) => void;
}
