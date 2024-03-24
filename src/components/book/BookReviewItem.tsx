import { BookReviewItem as IBookReviewItem } from "@/models/book.model";
import { formatDate } from "@/utils/format";
import styled from "styled-components";
import { FaStar } from "@react-icons/all-files/fa/FaStar";

interface Props {
  review: IBookReviewItem;
}

const Star = ({ score }: Pick<IBookReviewItem, "score">) => {
  return (
    <span className="star">
      {Array.from({ length: score }, (_, i) => (
        <span key={i}>
          <FaStar />
        </span>
      ))}
    </span>
  );
};

const BookReviewItem = ({ review }: Props) => {
  return (
    <BookReviewItemStyle>
      <header className="review-header">
        <div className="name-score-container">
          <span className="name">{review.userName}</span>
          <Star score={review.score} />
        </div>
        <div className="date-container">
          <span className="date">{formatDate(review.createdAt)}</span>
        </div>
      </header>
      <div className="content">
        <p>{review.review}</p>
      </div>
    </BookReviewItemStyle>
  );
};

const BookReviewItemStyle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  padding: 1rem;
  justify-content: space-between;
  box-shadow: ${({ theme }) => theme.borderShadow.itemShadow};
  border-radius: ${({ theme }) => theme.borderRadius.default};

  .review-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0;

    .name-score-container {
      display: flex;
      flex-wrap: wrap;
      gap: 1rem;
    }

    .star {
      svg {
        fill: #ff7b00;
      }
    }

    .date {
      word-break: keep-all;
    }
  }

  .content {
    padding: 0;

    p {
      margin: 0;
    }
  }

  @media ${({ theme }) => theme.mediaQuery.mobile} {
    .review-header {
      font-size: 2.3rem;
    }
    p {
      font-size: 2rem;
    }
  }

  @media ${({ theme }) => theme.mediaQuery.tablet} {
    .review-header {
      font-size: 1.8rem;
    }
    p {
      font-size: 1.6rem;
    }
  }

  @media ${({ theme }) => theme.mediaQuery.desktop} {
    .review-header {
      font-size: 1.6rem;
    }
    p {
      font-size: 1.4rem;
    }
  }
`;

export default BookReviewItem;
