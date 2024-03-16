import { setupWorker } from "msw/browser";
import { addReview, reviewsById, reviewForMain } from "./review";
import { bestBooks } from "./books";
import { banners } from "./banner";

const handlers = [reviewsById, addReview, reviewForMain, bestBooks, banners];

// 서비스 워커 생성
export const worker = setupWorker(...handlers);
