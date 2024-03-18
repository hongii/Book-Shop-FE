import { HttpResponse, http } from "msw";
import { fakerKO as faker } from "@faker-js/faker";
import { Banner } from "@/models/banner.model";

// faker api 사용
const mockBannerData: Banner[] = Array.from({ length: 6 }, (_, i) => ({
  id: i,
  title: faker.lorem.sentence().slice(0, 10),
  description: faker.lorem.paragraph().slice(0, 40),
  image: `https://picsum.photos/id/${faker.helpers.rangeToNumber({ min: 0, max: 80 })}/1200/400`,
  clickUrl: "http://some.url",
  target: "_blank", // 새창에서 열기
}));

// 핸들러 작성
export const banners = http.get(`${process.env.REACT_APP_BASE_URL}/banners`, () => {
  return HttpResponse.json(mockBannerData, { status: 200 });
});
