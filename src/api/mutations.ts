import api from "~/config/api";

import {
  UpdateProfileMutationData,
  UpdateUserAvatarMutationData,
  CreateAppointmentMutationData,
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
