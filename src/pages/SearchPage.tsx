import BooksList from "@/components/books/BooksList";
import Button from "@/components/common/Button";
import Empty from "@/components/common/Empty";
import Loading from "@/components/common/Loading";
import Title from "@/components/common/Title";
import { useAladinSearchBook } from "@/hooks/useAladinSearchBook";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { useSearchParams } from "react-router-dom";
import { FaRegGrinBeamSweat } from "@react-icons/all-files/fa/FaRegGrinBeamSweat";
import { HiCursorClick } from "@react-icons/all-files/hi/HiCursorClick";
import styled from "styled-components";

const SearchPage = () => {
  const [params] = useSearchParams();
  const query = params.get("query");
  const {
    searchBooks,
    isSearchBooksLoading,
    isSearchBooksFetching,
    fetchNextPage,
    hasNextPage,
    totalBooks,
  } = useAladinSearchBook(query);

  const moreRef = useIntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        loadMore();
      }
    },
    { threshold: 0.5 },
  );

  const loadMore = () => {
    if (!hasNextPage || isSearchBooksFetching) return;

    fetchNextPage();
  };

  if (!searchBooks || isSearchBooksLoading) return <Loading />;

  return (
    <SearchPageStyle>
      <Title size="large">
        '{query}'에 대한 검색 결과 ({totalBooks}개)
      </Title>
      <div className="search-result">
        {totalBooks !== 0 ? (
          <BooksList books={searchBooks} />
        ) : (
          <Empty
            icon={<FaRegGrinBeamSweat />}
            linkIcon={<HiCursorClick />}
            title={`'${query}'에 대한 검색결과가 없습니다.`}
            link="/"
            linkMsg="메인 화면으로 가기"
          />
        )}
      </div>

      <div className="more" ref={moreRef}>
        {totalBooks !== 0 && (
          <Button
            size="medium"
            scheme="primary"
            onClick={() => fetchNextPage()}
            disabled={!hasNextPage}
          >
            {hasNextPage ? "더 많은 도서보기" : "마지막 페이지"}
          </Button>
        )}
      </div>
    </SearchPageStyle>
  );
};

const SearchPageStyle = styled.div`
  padding: 1.8rem 0;
  height: 100%;

  .search-result {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .more {
    display: flex;
    align-items: center;
    justify-content: center;
    padding-top: 1.8rem;
  }
`;

export default SearchPage;
