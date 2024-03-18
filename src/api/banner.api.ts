import { Banner } from "@/models/banner.model";
import { httpClient } from "@/api/http";

export const fetchBanners = async () => {
  try {
    const { data } = await httpClient.get<Banner[]>(`/banners`);
    return data;
  } catch (err: any) {
    throw err;
  }
};
