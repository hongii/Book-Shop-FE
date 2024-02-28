import React from "react";
import { Book } from "../../models/book.model";
import styled from "styled-components";
import { getImgSrc } from "../../utils/image";
import { formatNumber } from "../../utils/format";
import { GoHeart } from "@react-icons/all-files/go/GoHeart";

interface Props {
  book: Book;
}

const BookItem = ({ book }: Props) => {
  return (
    <BookItemStyle>
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
    </BookItemStyle>
  );
};

const BookItemStyle = styled.section`
  display: flex;
  flex-direction: column;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.2);
  max-width: 600px;

  .book-img {
    border-radius: ${({ theme }) => theme.borderRadius.default};
    overflow: hidden;

    img {
      max-width: 100%;
    }
  }

  .contents {
    padding: 16px;
    position: relative;

    .title {
      font-size: 1.25rem;
      font-weight: 700;
      margin: 0 0 12px 0;
    }

    .summary {
      font-size: 0.75rem;
      color: ${({ theme }) => theme.color.secondary};
      margin: 0 0 4px 0;
    }

    .author {
      font-size: 0.75rem;
      color: ${({ theme }) => theme.color.secondary};
      margin: 0 0 4px 0;
    }

    .price {
      font-size: 1rem;
      font-weight: 700;
      color: ${({ theme }) => theme.color.secondary};
      margin: 0 0 4px 0;
    }

    .likes {
      font-size: 0.875rem;
      font-weight: 700;
      display: inline-flex;
      align-items: center;
      gap: 3px;
      color: ${({ theme }) => theme.color.primary};
      cursor: pointer;
      border-radius: ${({ theme }) => theme.borderRadius.default};
      border: 1px solid ${({ theme }) => theme.color.border};
      padding: 4px 12px;
      position: absolute;
      bottom: 16px; // .contents의 padding-bottom과 동일한 값을 준다 => 가장 하단 요소인 .price의 높이와 동일하게 우측으로 배치하기 위해
      right: 16px;
    }

    span {
      font-size: 0.875rem;
      font-weight: 700;
      color: ${({ theme }) => theme.color.primary};
    }
  }
`;

export default BookItem;
