import { create } from "zustand";
// interface UserInfo {
//   id: number;
//   name: string;
//   email: string;
//   contact:string;
// }

interface StoreState {
  // userInfo: UserInfo;
  isLoggedIn: boolean; // 상태 변수(state)
  storeLogin: (token: string) => void; // 상태 변경 함수(action)
  storeLogout: () => void;
}

export const getToken = () => {
  const token = localStorage.getItem("token");
  return token; // 로컬 스토리지에 "token"필드가 없는 경우엔 null을 반환
};

export const setToken = (token: string) => {
  localStorage.setItem("token", token);
};

export const removeToken = () => {
  localStorage.removeItem("token");
};

export const useAuthStore = create<StoreState>((set) => ({
  isLoggedIn: getToken() ? true : false, // 초기값 설정
  storeLogin: (token: string) => {
    set({ isLoggedIn: true });
    setToken(token);
  },
  storeLogout: () => {
    set({ isLoggedIn: false });
    removeToken();
  },
}));
