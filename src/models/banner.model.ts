export interface Banner {
  id: number;
  title: string;
  description: string;
  image: string; // 이미지 url
  clickUrl: string; // 배너 이미지 클릭 시 이동할 url
  target: string; // a요소의 target 속성
}
