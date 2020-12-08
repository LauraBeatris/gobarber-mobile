import axios from "axios";
import { API_URL } from "react-native-dotenv";

const api = axios.create({
  baseURL: API_URL,
});

export const assignDefaultAuthToken = (token: string) => {
  api.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export default api;
