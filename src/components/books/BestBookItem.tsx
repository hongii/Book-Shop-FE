import styled from "styled-components";
import BookItem, { BookItemStyle } from "./BookItem";
import { AladinBook } from "@/models/aladinBook.model";

interface Props {
  book: AladinBook;
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
    flex: 1;

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
    font-size: 2rem;
    color: #fff;
    font-weight: 700;
    font-style: italic;
  }

  @media ${({ theme }) => theme.mediaQuery.mobile} {
    .rank {
      font-size: 3rem;
      width: 5rem;
      height: 5rem;
    }
  }

  @media ${({ theme }) => theme.mediaQuery.tablet} {
    .rank {
      font-size: 2.5rem;
      width: 4rem;
      height: 4rem;
    }
  }
`;

export default BestBookItem;
