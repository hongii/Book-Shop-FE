import { JoinProps } from "./../pages/JoinPage";
import { httpClient } from "./http";

export const join = async (userData: JoinProps) => {
  try {
    const res = await httpClient.post("/users/join", userData);
    // console.log(res);
    return res;
  } catch (err: any) {
    throw err;
  }
};
