import { ResetProps } from "../pages/ResetPasswordPage";
import { JoinProps } from "./../pages/JoinPage";
import { httpClient } from "./http";

export const join = async (userData: JoinProps) => {
  try {
    const res = await httpClient.post("/users/join", userData);
    // console.log(res);
    return res.data;
  } catch (err: any) {
    throw err;
  }
};

export const resetPasswordRequest = async (userData: ResetProps) => {
  try {
    const res = await httpClient.post("/users/reset", userData);
    // console.log(res);
    return res.data;
  } catch (err: any) {
    throw err;
  }
};

export const resetPassword = async (userData: ResetProps) => {
  try {
    const res = await httpClient.put("/users/reset", userData);
    // console.log(res);
    return res.data;
  } catch (err: any) {
    throw err;
  }
};
