import React from "react";
import Title from "../components/common/Title";
import styled from "styled-components";
import BooksFilter from "../components/books/BooksFilter";
import BooksList from "../components/books/BooksList";
import BooksEmpty from "../components/books/BooksEmpty";
import Page from "../components/books/Page";
import BooksViewSwitcher from "../components/books/BooksViewSwitcher";
import { useBooks } from "../hooks/useBooks";

const BooksPage = () => {
  const { books, pagination, isEmpty, message } = useBooks();

  return (
    <>
      <BooksStyle>
        <Title size="large">도서 검색 결과</Title>
        <div className="filter">
          <BooksFilter />
          <BooksViewSwitcher />
        </div>

        {isEmpty ? (
          <BooksEmpty message={message as string} />
        ) : (
          <>
            <BooksList books={books} />
            <Page pagination={pagination} />
          </>
        )}
      </BooksStyle>
    </>
  );
};

const BooksStyle = styled.div`
  width: 100%;
  margin: 0 auto;
  max-width: ${({ theme }) => theme.layout.width.large};
  padding: 10px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 24px;

  .filter {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 0;
  }
`;
export default BooksPage;
