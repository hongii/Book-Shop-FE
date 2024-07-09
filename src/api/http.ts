import axios, { AxiosRequestConfig } from "axios";
import { getToken, removeToken, removeUserName, setToken } from "@/store/authStore";

const BASE_URL = process.env.REACT_APP_BASE_URL;
const DEFAULT_TIMEOUT = Number(process.env.REACT_APP_DEFAULT_TIMEOUT);
const loginMsg = {
  LOGIN_BAD_REQUEST: "이메일 또는 비밀번호를 잘못 입력했습니다. 입력하신 내용을 다시 확인해주세요.",
};
const joinMsg = {
  DUPLICATE_EMAIL: "이미 가입된 이메일입니다. 다른 이메일을 입력해주세요.",
};

const createClient = (config?: AxiosRequestConfig) => {
  const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: DEFAULT_TIMEOUT,
    headers: {
      "content-type": "application/json",
    },
    withCredentials: true,
    ...config,
  });

  // 요청 인터셉터
  axiosInstance.interceptors.request.use(
    (config) => {
      const accessToken = getToken();
      if (accessToken) {
        config.headers.authorization = `Bearer ${accessToken}`;
      } else {
        delete config.headers.authorization;
      }
      return config;
    },
    (err) => {
      return Promise.reject(err);
    },
  );

  // 응답 인터셉터
  axiosInstance.interceptors.response.use(
    (res) => {
      const newAccessToken = res.headers.authorization;
      if (newAccessToken) {
        const token = newAccessToken.split(" ")[1];
        setToken(token);
      }
      return res;
    },
    (err) => {
      if (err.response.status === 401) {
        removeToken();
        removeUserName();

        window.alert(err.response.data.message);
        window.location.href = "/login";
        return;
      } else if (err.response.status === 403) {
        window.alert(err.response.data.message);
        return;
      } else if (err.response.status === 400 && (!joinMsg || !loginMsg)) {
        window.alert(err.response.data.message);
        return;
      } else if (err.response.status >= 500) {
        window.alert(err.response.data.message);
        return;
      }

      return Promise.reject(err);
    },
  );
  return axiosInstance;
};

export const httpClient = createClient();
