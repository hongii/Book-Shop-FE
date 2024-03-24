import { convertParamsToQueryString } from "@/utils/convert";
import { AladinBook, AladinBookDetail } from "@/models/aladinBook.model";
import { httpClient } from "./http";

type ListQueryType =
  | "ItemNewAll"
  | "ItemNewSpecial"
  | "ItemEditorChoice"
  | "Bestseller"
  | "BlogBest";
type ListSearchTarget = "Book" | "Foreign" | "Music" | "DVD" | "Used" | "eBook" | "All";
type ListSubSearchTarget = "Book" | "Music" | "DVD";
type Cover = "Big" | "MidBig" | "Mid" | "Small" | "Mini" | "None";
type Output = "XML" | "JS";
// type OptResult = ("ebookList" | "usedList" | "reviewList" | "ratingInfo" | "bestSellerRank")[];
type ItemIdType = "ISBN" | "ISBN13" | "ItemId";

export interface BookListParams {
  QueryType: ListQueryType; // 리스트 종류
  SearchTarget?: ListSearchTarget; // 조회 대상 Mall
  SubSearchTarget?: ListSubSearchTarget; // SearchTarget이 중고(Used)인 경우, 서브 Mall 지정
  Start?: number; // 검색결과 시작페이지
  MaxResults?: string; // 검색결과 한 페이지당 최대 출력 개수
  Cover?: Cover; // 표지 이미지 크기
  CategoryId?: string | null; // 특정 분야로 검색결과를 제한함
  Output?: Output; // 출력방법
  outofStockfilter?: string; // 품절/절판 등 재고 없는 상품 필터링("1"이 제외 필터)
  Year?: string; // 출간일(년단위) 제한 필터링
  Month?: string; // 출간일(월단위) 제한 필터링
  Week?: string; // 출간일(주단위) 제한 필터링
  OptResult?: string; // 부가 정보
  Version?: string; // 버전 정보(최신 버전: 20131101)
}

export interface BookDetailParmas {
  ItemIdType: ItemIdType;
  ItemId: string;
  Cover?: Cover;
  Output?: Output;
  Version?: string;
  OptResult?: string;
}

const fetchBookListByCategory = async (
  queryType: ListQueryType,
  categoryId: string | null,
  start: number,
  limit = "20",
) => {
  const params: BookListParams = {
    QueryType: queryType,
    SearchTarget: "Book",
    MaxResults: limit,
    Cover: "Big",
    Output: "JS",
    Version: "20131101",
    Start: start,
    ...(categoryId ? { CategoryId: categoryId } : {}),
  };

  const queryString = convertParamsToQueryString(params);
  const data = await httpClient.get(`/aladin/list?${queryString}`);
  return data;
};

export const fetchBookList = async (
  queryType: ListQueryType,
  category: string | null,
  start: number,
  limit = "20",
) => {
  try {
    const { data } = await fetchBookListByCategory(queryType, category, start, limit);

    const booksData: AladinBook[] = data.map((item: any) => {
      return {
        itemId: item.itemId,
        title: item.title,
        categoryId: item.categoryId,
        categoryName: item.categoryName,
        description: item.description,
        author: item.author,
        priceStandard: item.priceStandard,
        pubDate: item.pubDate,
        cover: item.cover,
        form: "종이책",
        isbn13: item.isbn13,
        publisher: item.publisher,
      };
    });
    // console.log(booksData);
    return booksData;
  } catch (err) {
    throw err;
  }
};

const fetchBookItemLookUp = async (itemId: string) => {
  const params: BookDetailParmas = {
    ItemIdType: "ItemId",
    ItemId: itemId,
    Cover: "Big",
    Output: "JS",
    Version: "20131101",
    OptResult: ["ratingInfo", "bestSellerRank"].join(","),
  };

  const queryString = convertParamsToQueryString(params);
  const data = await httpClient.get(`/aladin/item?${queryString}`);
  return data;
};

export const fetchBookDetail = async (itemId: string) => {
  try {
    const { data } = await fetchBookItemLookUp(itemId);
    const bookDetailData: AladinBookDetail = {
      itemId: data[0].itemId,
      title: data[0].title,
      categoryId: data[0].categoryId,
      categoryName: data[0].categoryName,
      description: data[0].description,
      author: data[0].author,
      priceStandard: data[0].priceStandard,
      pubDate: data[0].pubDate,
      cover: data[0].cover,
      form: "종이책",
      isbn13: data[0].isbn13,
      publisher: data[0].publisher,
      itemPage: data[0].subInfo.itemPage,
      ratingScore: data[0].subInfo.ratingInfo.ratingScore,
      ratingCount: data[0].subInfo.ratingInfo.ratingCount,
      myReviewCount: data[0].subInfo.ratingInfo.myReviewCount,
      bestSellerRank: data[0].subInfo.bestSellerRank,
      likes: data.likes,
      isLiked: data.isLiked,
    };
    // console.log(bookDetailData);
    return bookDetailData;
  } catch (err) {
    throw err;
  }
};
