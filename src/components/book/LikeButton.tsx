import styled from "styled-components";
import { BookDetail } from "../../models/book.model";
import Button from "../common/Button";
import { GoHeart } from "@react-icons/all-files/go/GoHeart";

interface Props {
  book: BookDetail;
  onClick: () => void;
}

const LikeButton = ({ book, onClick }: Props) => {
  return (
    <LikeButtonStyle
      size="medium"
      scheme={`${book.isLiked ? "primary" : "normal"}`}
      onClick={onClick}
      book={book}
    >
      <GoHeart /> {book.likes}
    </LikeButtonStyle>
  );
};

const LikeButtonStyle = styled(Button)<Props>`
  /* display: flex;
  align-items: center;
  gap: 6px; */
  color: ${({ book }) => (book.isLiked ? "red" : "inherit")};
  font-size: 1.5rem;

  svg {
    color: ${({ book }) => (book.isLiked ? "red" : "inherit")};
  }
`;

export default LikeButton;
