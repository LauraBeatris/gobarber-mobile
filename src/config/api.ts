/* eslint-disable no-param-reassign */
/* eslint-disable consistent-return */
import AsyncStorage from "@react-native-community/async-storage";
import axios, { AxiosPromise, AxiosRequestConfig } from "axios";
import { API_URL } from "react-native-dotenv";

import { REFRESH_TOKEN_STORAGE_KEY, TOKEN_STORAGE_KEY } from "~/constants/asyncStorage";

const api = axios.create({
  baseURL: API_URL,
});

export const assignDefaultAuthToken = (token: string) => {
  api.defaults.headers.common.Authorization = `Bearer ${token}`;
};

// Intercept request and set Authorization header
api.interceptors.request.use(async (config): Promise<AxiosRequestConfig> => {
  const token = await AsyncStorage.getItem(TOKEN_STORAGE_KEY);

  if (token) {
    assignDefaultAuthToken(token);
  }

  return config;
}, error => {
  Promise.reject(error);
});

/*
  Intercept response and verify if the status is 403 (Forbidden), if so,
   executes a request to get a new token and retry the last request
*/
api.interceptors.response.use((response) => response, async error => {
  const originalRequestConfig = error?.config;

  if (!error.response) {
    // TODO -> Send report to Sentry (API Down)

    throw new Error("The system is not working as expected. Please, try again after some minutes");
  }

  if (error.response.status === 403 && !originalRequestConfig._retry) {
    originalRequestConfig._retry = true;

    const refresh_token = await AsyncStorage.getItem(REFRESH_TOKEN_STORAGE_KEY);

    return api.post("/refresh-token", {
      refresh_token,
    }).then(async (postResponse): Promise<AxiosPromise<AxiosRequestConfig> | undefined> => {
      if (postResponse?.status !== 200) {
        return undefined;
      }

      const newToken = postResponse?.data?.token;
      const newRefreshToken = postResponse?.data?.refreshToken;

      await AsyncStorage.setItem(TOKEN_STORAGE_KEY, newToken);
      await AsyncStorage.setItem(REFRESH_TOKEN_STORAGE_KEY, newRefreshToken);

      api.defaults.headers.common.Authorization = `Bearer ${newToken}`;

      return api(originalRequestConfig);
    });
  }

  return Promise.reject(error);
});

export default api;
