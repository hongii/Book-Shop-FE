import { join, login, resetPassword, resetPasswordRequest } from "@/api/auth.api";
import { JoinProps } from "@/pages/JoinPage";
import { LoginProps } from "@/pages/LoginPage";
import { useAuthStore } from "@/store/authStore";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAlert } from "./useAlert";
import { ResetProps } from "@/pages/ResetPasswordPage";

export const useAuth = () => {
  // 상태
  const { isLoggedIn, storeLogin, storeLogout } = useAuthStore();
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [resetRequested, setResetRequested] = useState(false);
  const { showAlert } = useAlert();
  const navigate = useNavigate();

  // 메서드
  const userJoin = async (data: JoinProps) => {
    try {
      const { message } = await join(data);
      setErrorMsg(null);
      showAlert(message);
      navigate("/login");
    } catch (err: any) {
      const { message: errMsg } = err.response.data;
      setErrorMsg(errMsg);
    }
  };

  const userLogin = async (data: LoginProps) => {
    try {
      const { id, email, name, contact, accessToken } = await login(data);
      storeLogin(accessToken);
      setErrorMsg(null);
      navigate("/");
    } catch (err: any) {
      const { message: errMsg } = err.response.data;
      setErrorMsg(errMsg);
    }
  };

  const userResetPasswordRequest = async (data: ResetProps) => {
    // 비밀번호 초기화 요청(가입한 이메일 확인과정)
    try {
      await resetPasswordRequest(data);
      setResetRequested(true);
      setErrorMsg(null);
    } catch (err: any) {
      const { message: errMsg } = err.response.data;
      setErrorMsg(errMsg);
    }
  };

  const userResetPassword = async (data: ResetProps) => {
    try {
      // 비밀번호 초기화(비밀번호 변경과정)
      const { message } = await resetPassword(data);
      showAlert(message);
      setResetRequested(false);
      setErrorMsg(null);
      navigate("/login");
    } catch (err: any) {
      const { message: errMsg } = err.response.data;
      setErrorMsg(errMsg);
    }
  };

  // return
  return {
    errorMsg,
    resetRequested,
    userJoin,
    userLogin,
    userResetPassword,
    userResetPasswordRequest,
  };
};
