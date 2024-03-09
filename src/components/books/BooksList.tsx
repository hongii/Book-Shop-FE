import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Book } from "@/models/book.model";
import BookItem from "@/components/books/BookItem";
import { useLocation } from "react-router-dom";
import { QUERYSTRING } from "@/constants/querystring";
import { ViewMode } from "@/components/books/BooksViewSwitcher";

interface Props {
  books: Book[];
}

const BooksList = ({ books }: Props) => {
  const { search } = useLocation();
  const [view, setView] = useState<ViewMode>("grid");

  useEffect(() => {
    const params = new URLSearchParams(search);
    const viewType = params.get(QUERYSTRING.VIEW) as ViewMode;
    if (viewType) {
      setView(viewType);
    } else {
      setView("grid");
    }
  }, [search]);

  return (
    <BooksListStyle view={view}>
      {books?.map((book: Book) => (
        <BookItem book={book} view={view} key={book.id} />
      ))}
    </BooksListStyle>
  );
};

interface BookListStyleProps {
  view: ViewMode;
}

const BooksListStyle = styled.section<BookListStyleProps>`
  display: grid;
  grid-template-columns: ${({ view }) =>
    view === "grid" ? "repeat(auto-fill, minmax(180px, auto))" : "repeat(1, 1fr)"};
  gap: 24px;
`;

export default BooksList;
