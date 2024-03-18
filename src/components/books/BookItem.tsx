import { Book } from "../../models/book.model";
import styled from "styled-components";
import { getImgSrc } from "../../utils/image";
import { formatNumber } from "../../utils/format";
import { GoHeart } from "@react-icons/all-files/go/GoHeart";
import { ViewMode } from "./BooksViewSwitcher";
import { Link } from "react-router-dom";
import Button from "../common/Button";

interface Props {
  book: Book;
  isFake?: boolean;
  view?: ViewMode;
}

const BookItem = ({ book, view, isFake = false }: Props) => {
  return (
    <BookItemStyle view={view}>
      {isFake ? (
        <div className="book-img">
          <img src={getImgSrc(Number(book.imgUrl))} alt={book.title} />
        </div>
      ) : (
        <Link to={`/books/${book.id}`}>
          <div className="book-img">
            <img src={getImgSrc(Number(book.imgUrl))} alt={book.title} />
          </div>
        </Link>
      )}

      <div className="contents">
        <h2 className="title">{book.title}</h2>
        <p className="summary"> {book.summary}</p>
        <p className="author"> {book.author}</p>
        <div className="sub-contents">
          <p className="price"> {formatNumber(book.price)}원</p>
          <Button size="medium" scheme="primary">
            <GoHeart />
            {book.likes}
          </Button>
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

  .book-img {
    border-radius: ${({ theme }) => theme.borderRadius.default};
    overflow: hidden;
    height: 100%;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .contents {
    padding: 1.2rem;
    flex: ${({ view }) => (view === "grid" ? "0" : "1")};
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 1rem;

    .title {
      font-weight: 700;
      /* margin: 0 0 12px 0; */
    }

    p {
      color: ${({ theme }) => theme.color.secondary};
      /* margin: 0 0 4px 0; */
      margin: 0;
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
      font-size: 2.5rem;
    }
    p {
      font-size: 2.3rem;
    }
    .summary {
      height: calc(2 * 1.2 * 2.3rem);
      font-size: 2.3rem;
    }

    .book-img {
      overflow: hidden;
      max-width: ${({ view }) => (view === "grid" ? "auto" : "160px")};
    }
  }

  @media ${({ theme }) => theme.mediaQuery.tablet} {
    .title {
      font-size: 2.3rem;
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
      max-width: ${({ view }) => (view === "grid" ? "auto" : "200px")};
    }
  }

  @media ${({ theme }) => theme.mediaQuery.desktop} {
    .title {
      font-size: 2rem;
    }
    p {
      font-size: 1.6rem;
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
