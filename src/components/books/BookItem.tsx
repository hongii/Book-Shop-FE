import styled from "styled-components";
import { formatNumber } from "../../utils/format";
import { ViewMode } from "./BooksViewSwitcher";
import { Link } from "react-router-dom";
import { AladinBook } from "@/models/aladinBook.model";

interface Props {
  book: AladinBook;
  view?: ViewMode;
}

const BookItem = ({ book, view }: Props) => {
  return (
    <BookItemStyle view={view}>
      <Link to={`/books/${book.itemId}`}>
        <div className="book-img">
          <img src={book.cover} alt={book.title} />
        </div>
      </Link>

      <div className="contents">
        <h2 className="title">{book.title}</h2>
        <p className="author"> {book.author}</p>
        <div className="sub-contents">
          <p className="price"> {formatNumber(book.priceStandard)}원</p>
        </div>
      </div>
    </BookItemStyle>
  );
};

export const BookItemStyle = styled.section<Pick<Props, "view">>`
  display: flex;
  flex-direction: ${({ view }) => (view === "grid" ? "column" : "row")};
  box-shadow: ${({ theme }) => theme.borderShadow.itemShadow};
  border-radius: ${({ theme }) => theme.borderRadius.default};
  height: 100%;

  .book-img {
    border-radius: ${({ theme }) => theme.borderRadius.default};
    overflow: hidden;

    img {
      width: 100%;
      height: auto;
      max-height: ${({ view }) => (view === "grid" ? "300px" : "auto")};
      object-fit: contain;
    }
  }

  .contents {
    padding: 1.2rem;
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 1rem;
    height: 100%;

    .title {
      font-weight: 700;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: ${({ view }) => (view === "grid" ? 2 : "unset")};
      -webkit-box-orient: vertical;
    }

    p {
      color: ${({ theme }) => theme.color.secondary};
      margin: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: ${({ view }) => (view === "grid" ? 2 : "unset")};
      -webkit-box-orient: vertical;
    }

    .summary {
      line-height: 1.2;

      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2; /* 보여질 줄의 갯수  */
      -webkit-box-orient: vertical;
    }
  }

  .sub-contents {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;

    .price {
      font-weight: 700;
      margin: 0;
    }
  }

  @media ${({ theme }) => theme.mediaQuery.mobile} {
    .title {
      font-size: 2.2rem;
    }
    p {
      font-size: 2rem;
    }
    .summary {
      height: calc(2 * 1.2 * 2rem);
      font-size: 2rem;
    }

    .book-img {
      overflow: hidden;
      max-width: ${({ view }) => (view === "grid" ? "auto" : "160px")};
    }
  }

  @media ${({ theme }) => theme.mediaQuery.tablet} {
    .title {
      font-size: 2rem;
    }
    p {
      font-size: 1.7rem;
    }
    .summary {
      height: calc(2 * 1.2 * 1.8rem);
      font-size: 1.8rem;
    }
    .book-img {
      overflow: hidden;
      max-width: ${({ view }) => (view === "grid" ? "auto" : "200px")};
    }
  }

  @media ${({ theme }) => theme.mediaQuery.desktop} {
    .title {
      font-size: 1.7rem;
    }
    p {
      font-size: 1.5rem;
    }
    .summary {
      height: calc(2 * 1.2 * 1.6rem);
      font-size: 1.6rem;
    }
    .book-img {
      overflow: hidden;
      max-width: ${({ view }) => (view === "grid" ? "auto" : "220px")};
    }
  }
`;

export default BookItem;
