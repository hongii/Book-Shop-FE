import { setupWorker } from "msw/browser";
import { addReview, reviewsById, reviewForMain } from "@/mock/review";
import { bestBooks } from "@/mock/books";
import { banners } from "@/mock/banner";

const handlers = [reviewsById, addReview, reviewForMain, bestBooks, banners];

// 서비스 워커 생성
export const worker = setupWorker(...handlers);
