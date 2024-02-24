import axios, { AxiosRequestConfig } from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;
const DEFAULT_TIMEOUT = Number(process.env.REACT_APP_DEFAULT_TIMEOUT);

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

  // 응답 인터셉터 추가하기
  axiosInstance.interceptors.response.use(
    (res) => {
      // 2xx 범위에 있는 상태 코드는 이 함수를 트리거
      // 응답 데이터가 있는 작업 수행
      return res;
    },
    (err) => {
      // 2xx 외의 범위에 있는 상태 코드는 이 함수를 트리거
      // 응답 오류가 있는 작업 수행
      return Promise.reject(err);
    },
  );
  return axiosInstance;
};

export const httpClient = createClient();
