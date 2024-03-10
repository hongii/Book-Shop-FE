import { setupWorker } from "msw/browser";
import { reviewsById } from "./review";

const handlers = [reviewsById];

// 서비스 워커 생성
export const worker = setupWorker(...handlers);
