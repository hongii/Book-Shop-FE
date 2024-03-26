import { useEffect, useState } from "react";
import styled from "styled-components";
import BookItem from "@/components/books/BookItem";
import { useLocation } from "react-router-dom";
import { QUERYSTRING } from "@/constants/querystring";
import { ViewMode } from "@/components/books/BooksViewSwitcher";
import { AladinBook } from "@/models/aladinBook.model";

interface Props {
  books: AladinBook[];
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
      {books?.map((book: AladinBook) => (
        <BookItem book={book} view={view} key={book.itemId} />
      ))}
    </BooksListStyle>
  );
};

interface BookListStyleProps {
  view: ViewMode;
}

const BooksListStyle = styled.section<BookListStyleProps>`
  display: grid;

  @media ${({ theme }) => theme.mediaQuery.mobile} {
    grid-template-columns: ${({ view }) => (view === "grid" ? "repeat(2, 1fr)" : "repeat(1, 1fr)")};
    gap: 2.5rem;
  }

  @media ${({ theme }) => theme.mediaQuery.tablet} {
    grid-template-columns: ${({ view }) => (view === "grid" ? "repeat(3, 1fr)" : "repeat(1, 1fr)")};
    gap: 1.5rem;
  }

  @media ${({ theme }) => theme.mediaQuery.desktop} {
    grid-template-columns: ${({ view }) => (view === "grid" ? "repeat(4, 1fr)" : "repeat(1, 1fr)")};
    gap: 1.8rem;
  }

  @media screen and (min-width: 1600px) {
    /* "repeat(auto-fill,minmax(310px,auto))" */
    grid-template-columns: ${({ view }) => (view === "grid" ? "repeat(5, 1fr)" : "repeat(1, 1fr)")};
    gap: 1.8rem;
  }
`;

export default BooksList;
