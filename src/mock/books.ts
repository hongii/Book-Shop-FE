import { Book } from "@/models/book.model";
import { HttpResponse, http } from "msw";
import { fakerKO as faker } from "@faker-js/faker";

// faker api 사용
const mockBestBooksData: Book[] = Array.from({ length: 10 }, (_, i) => ({
  id: i,
  title: faker.lorem.sentence().slice(0, 10),
  imgUrl: faker.helpers.rangeToNumber({ min: 0, max: 50 }),
  categoryId: faker.helpers.rangeToNumber({ min: 1, max: 5 }),
  form: "종이책",
  isbn: faker.commerce.isbn(),
  summary: faker.lorem.paragraph(),
  detail: faker.lorem.paragraph(),
  author: faker.person.firstName(),
  pages: faker.helpers.rangeToNumber({ min: 50, max: 900 }),
  contents: faker.lorem.paragraph(),
  price: faker.helpers.rangeToNumber({ min: 1000, max: 50000 }),
  likes: faker.helpers.rangeToNumber({ min: 0, max: 999 }),
  publishedDate: faker.date.past().toString(),
}));

// 핸들러 작성
export const bestBooks = http.get(`${process.env.REACT_APP_BASE_URL}/books/best`, () => {
  return HttpResponse.json(mockBestBooksData, { status: 200 });
});
