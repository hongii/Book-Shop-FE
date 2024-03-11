import { create } from "zustand";

// interface UserInfo {
//   // id?: number;
//   name: string | null;
//   // email?: string;
//   // contact?:string;
// }

interface StoreState {
  userName: string | null;
  isLoggedIn: boolean; // 상태 변수(state)
  storeLogin: (token: string, name: string) => void; // 상태 변경 함수(action)
  storeLogout: () => void;
}

export const getUserName = () => {
  const userName = localStorage.getItem("userName");
  return userName;
};

export const setUserName = (name: string) => {
  localStorage.setItem("userName", name);
};

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

export const removeUserName = () => {
  localStorage.removeItem("userName");
};

export const useAuthStore = create<StoreState>((set) => ({
  userName: getToken() ? getUserName() : null,
  isLoggedIn: getToken() ? true : false, // 초기값 설정
  storeLogin: (token: string, name: string) => {
    set({ isLoggedIn: true });
    setToken(token);
    setUserName(name);
  },
  storeLogout: () => {
    set({ isLoggedIn: false });
    removeToken();
    removeUserName();
  },
}));
