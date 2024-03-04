import { Book } from "../../models/book.model";
import styled from "styled-components";
import { getImgSrc } from "../../utils/image";
import { formatNumber } from "../../utils/format";
import { GoHeart } from "@react-icons/all-files/go/GoHeart";
import { ViewMode } from "./BooksViewSwitcher";
import { Link } from "react-router-dom";

interface Props {
  book: Book;
  view: ViewMode;
}

const BookItem = ({ book, view }: Props) => {
  return (
    <BookItemStyle view={view}>
      <Link to={`/books/${book.id}`}>
        <div className="book-img">
          <img src={getImgSrc(book.id)} alt={book.title} />
        </div>
        <div className="contents">
          <h2 className="title">{book.title}</h2>
          <p className="summary"> {book.summary}</p>
          <p className="author"> {book.author}</p>
          <p className="price"> {formatNumber(book.price)}원</p>
          <button className="likes">
            <GoHeart />
            <span>{book.likes}</span>
          </button>
        </div>
      </Link>
    </BookItemStyle>
  );
};

const BookItemStyle = styled.section<Pick<Props, "view">>`
  display: flex;
  flex-direction: ${({ view }) => (view === "grid" ? "column" : "row")};
  box-shadow: ${({ theme }) => theme.borderShadow.itemShadow};
  /* min-width: ${({ view }) => (view === "grid" ? "150px" : "")}; */

  .book-img {
    border-radius: ${({ theme }) => theme.borderRadius.default};
    overflow: hidden;
    max-width: ${({ view }) => (view === "grid" ? "auto" : "200px")};

    img {
      max-width: 100%;
      object-fit: fill;
    }
  }

  .contents {
    padding: 16px;
    position: relative;
    flex: ${({ view }) => (view === "grid" ? "0" : "1")};

    .title {
      font-size: 1.5rem;
      font-weight: 700;
      margin: 0 0 12px 0;
    }

    p {
      font-size: 1rem;
      color: ${({ theme }) => theme.color.secondary};
      margin: 0 0 4px 0;
    }

    .summary {
      line-height: 1.2;
      height: calc(2 * 1.2 * 1.15rem); /* 2줄 * 상속받은 line-height(=1.5) * font-size(=0.75rem) */
      font-size: 1.15rem;

      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2; /* 보여질 줄의 갯수  */
      -webkit-box-orient: vertical;
    }

    .price {
      font-weight: 700;
    }

    .likes {
      font-size: 1rem;
      font-weight: 700;
      display: inline-flex;
      align-items: center;
      gap: 3px;
      color: ${({ theme }) => theme.color.primary};
      background-color: ${({ theme }) => theme.color.background};
      border-radius: ${({ theme }) => theme.borderRadius.default};
      border: 1px solid ${({ theme }) => theme.color.border};
      padding: 4px 8px;
      position: absolute;
      bottom: 20px; // .contents의 padding-bottom과 동일한 값을 준다 => 가장 하단 요소인 .price의 높이와 동일하게 우측으로 배치하기 위해
      right: 16px;
    }

    span {
      font-size: 1rem;
      font-weight: 700;
      color: ${({ theme }) => theme.color.primary};
    }
  }
`;

export default BookItem;
