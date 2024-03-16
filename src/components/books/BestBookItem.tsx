import { Book } from "@/models/book.model";
import styled from "styled-components";
import BookItem, { BookItemStyle } from "./BookItem";

interface Props {
  book: Book;
  itemIdx: number;
}
const BestBookItem = ({ book, itemIdx }: Props) => {
  return (
    <BestBookItemStyle>
      <BookItem book={book} view="grid" isFake={true} />
      <div className="rank">{itemIdx + 1}</div>
    </BestBookItemStyle>
  );
};

const BestBookItemStyle = styled.div`
  ${BookItemStyle} {
    height: 100%;

    .summary,
    .price,
    .likes {
      display: none;
    }

    h2 {
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }

    .contents {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
  }

  position: relative;

  .rank {
    position: absolute;
    top: -0.8rem;
    left: -0.8rem;
    width: 3rem;
    height: 3rem;
    background-color: ${({ theme }) => theme.color.third};
    border-radius: 500px;

    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.25rem;
    color: #fff;
    font-weight: 700;
    font-style: italic;
  }
`;

export default BestBookItem;
