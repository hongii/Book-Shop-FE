import Title from "@/components/common/Title";
import styled from "styled-components";
import BooksFilter from "@/components/books/BooksFilter";
import BooksList from "@/components/books/BooksList";
import BooksViewSwitcher from "@/components/books/BooksViewSwitcher";
import Empty from "@/components/common/Empty";
import { FaRegGrinBeamSweat } from "@react-icons/all-files/fa/FaRegGrinBeamSweat";
import { HiCursorClick } from "@react-icons/all-files/hi/HiCursorClick";
import Loading from "@/components/common/Loading";
import Button from "@/components/common/Button";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { useAladinBooks } from "@/hooks/useAladinBooks";

const BooksPage = () => {
  const {
    aladinBooks,
    isFetching: isBooksFetching,
    isLoading: isBooksLoading,
    fetchNextPage,
    hasNextPage,
    isEmpty,
  } = useAladinBooks();

  const callback = (entries: IntersectionObserverEntry[]) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        loadMore();
      }
    });
  };

  const moreRef = useIntersectionObserver(callback, { threshold: 0.5 });

  const loadMore = () => {
    if (!hasNextPage || isBooksFetching) return;
    fetchNextPage();
  };

  if (!aladinBooks || isBooksLoading) {
    return <Loading />;
  }

  return (
    <BooksStyle>
      <div className="main-contents">
        <Title size="large">도서 검색 결과</Title>
        <div className="filter">
          <BooksFilter />
          <BooksViewSwitcher />
        </div>
        <div className="books">
          {isEmpty && (
            <Empty
              icon={<FaRegGrinBeamSweat />}
              linkIcon={<HiCursorClick />}
              title="조회 가능한 도서가 없습니다."
              link="/"
              linkMsg="메인 화면으로 가기"
            />
          )}
          {!isEmpty && <BooksList books={aladinBooks} />}
        </div>
      </div>

      <div className="more" ref={moreRef}>
        {!isEmpty && (
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
    </BooksStyle>
  );
};

const BooksStyle = styled.div`
  width: 100%;
  margin: 0 auto;
  height: 100%;
  padding: 2rem;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 1rem;

  .main-contents {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 0.8rem;
  }

  .filter {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
  }

  .books {
    flex: 1;
  }

  .more {
    margin-top: 2rem;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
export default BooksPage;
