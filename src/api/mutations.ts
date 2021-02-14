import api from "~/config/api";

import {
  CreateUserMutationData,
  CreateSessionMutationData,
  UpdateProfileMutationData,
  UpdateUserAvatarMutationData,
  CreateAppointmentMutationData,
  CreateRecoverPasswordRequestMutationData,
} from "./types";

export const createAppointmentMutation = async ({
  date,
  type,
  provider_id,
}: CreateAppointmentMutationData) => {
  const { data } = await api.post("/appointments", {
    date,
    type,
    provider_id,
  });

  return data;
};

export const updateProfileMutation = async (profileData: UpdateProfileMutationData) => {
  const { data } = await api.put("/profile", profileData);

  return data;
};

export const updateUserAvatarMutation = async ({
  uri,
  name,
  type,
}: UpdateUserAvatarMutationData) => {
  const formData = new FormData();

  formData.append("avatar", {
    uri,
    name,
    type,
  });

  const { data } = await api.patch("/users/avatar", formData);

  return data;
};

export const createUserMutation = async (userData: CreateUserMutationData) => {
  const { data } = await api.post("/users", {
    ...userData,
    is_provider: false,
  });

  return data;
};

export const createSessionMutation = async (sessionData: CreateSessionMutationData) => {
  const { data } = await api.post("sessions", sessionData);

  return data;
};

export const createRecoverPasswordRequest = async (
  recoverPasswordRequestData: CreateRecoverPasswordRequestMutationData,
) => {
  const { data } = await api.post("/password/recover-request", recoverPasswordRequestData);

  return data;
};
