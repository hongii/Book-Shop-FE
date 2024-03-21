import axios, { AxiosRequestConfig } from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const createClient = (config?: AxiosRequestConfig) => {
  const axiosInstance = axios.create({
    baseURL: BASE_URL,
    ...config,
  });

  return axiosInstance;
};

export const aladinHttpClient = createClient();
