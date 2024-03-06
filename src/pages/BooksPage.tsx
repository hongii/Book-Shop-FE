import Title from "../components/common/Title";
import styled from "styled-components";
import BooksFilter from "../components/books/BooksFilter";
import BooksList from "../components/books/BooksList";
import Page from "../components/books/Page";
import BooksViewSwitcher from "../components/books/BooksViewSwitcher";
import { useBooks } from "../hooks/useBooks";
import Empty from "../components/common/Empty";
import { FaRegGrinBeamSweat } from "@react-icons/all-files/fa/FaRegGrinBeamSweat";
import { HiCursorClick } from "@react-icons/all-files/hi/HiCursorClick";

const BooksPage = () => {
  const { books, pagination, isEmpty, message } = useBooks();

  return (
    <BooksStyle>
      <Title size="large">도서 검색 결과</Title>

      <div className="filter">
        <BooksFilter />
        <BooksViewSwitcher />
      </div>
      {isEmpty ? (
        <Empty
          icon={<FaRegGrinBeamSweat />}
          linkIcon={<HiCursorClick />}
          title={message as string}
          link="/"
          linkMsg="메인 화면으로 가기"
        />
      ) : (
        <>
          <BooksList books={books} />
          <Page pagination={pagination} />
        </>
      )}
    </BooksStyle>
  );
};

const BooksStyle = styled.div`
  width: 100%;
  margin: 0 auto;
  max-width: ${({ theme }) => theme.layout.width.large};
  padding: 2rem;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 16px;

  .filter {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 0;
  }
`;
export default BooksPage;
