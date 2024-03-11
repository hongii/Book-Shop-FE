import styled from "styled-components";
import BookReviewItem from "@/components/book/BookReviewItem";
import { BookReviewItem as IBookReviewItem } from "@/models/book.model";
import AddBookReview from "@/components/book/AddBookReview";
import Button from "@/components/common/Button";
import { useState } from "react";

interface Props {
  reviews: IBookReviewItem[];
  bookId: string;
}

interface ReviewButtonProps {
  isClicked: boolean;
  handleClick: () => void;
}

const ReviewButton = ({ isClicked, handleClick }: ReviewButtonProps) => {
  return (
    <div className="review-btn">
      <Button size="medium" scheme="primary" onClick={handleClick}>
        {isClicked ? "취소" : "리뷰 작성"}
      </Button>
    </div>
  );
};

const BookReview = ({ reviews, bookId }: Props) => {
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const handleClick = () => {
    setIsClicked((prev) => !prev);
  };

  return (
    <BookReviewStyle>
      {!isClicked && <ReviewButton isClicked={isClicked} handleClick={handleClick} />}

      {isClicked && (
        <AddBookReview bookId={bookId} toggleReviewButton={handleClick}>
          <ReviewButton isClicked={isClicked} handleClick={handleClick} />
        </AddBookReview>
      )}
      {reviews
        .slice()
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        .map((review) => (
          <BookReviewItem key={review.id} review={review} />
        ))}
    </BookReviewStyle>
  );
};

const BookReviewStyle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;

  .review-btn {
    align-self: flex-end;
  }
`;

export default BookReview;
