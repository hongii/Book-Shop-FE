import styled from "styled-components";
import BookReviewItem from "@/components/book/BookReviewItem";
import { BookReviewItem as IBookReviewItem } from "@/models/book.model";

interface Props {
  reviews: IBookReviewItem[];
}

const BookReview = ({ reviews }: Props) => {
  return (
    <BookReviewStyle>
      {reviews.map((review) => (
        <BookReviewItem key={review.id} review={review} />
      ))}
    </BookReviewStyle>
  );
};

const BookReviewStyle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  margin: 1.2rem 0;
`;

export default BookReview;
