import { setupWorker } from "msw/browser";
import { addReview, reviewsById } from "./review";

const handlers = [reviewsById, addReview];

// 서비스 워커 생성
export const worker = setupWorker(...handlers);
