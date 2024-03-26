import styled from "styled-components";
import BestBookItem from "@/components/books/BestBookItem";
import { AladinBook } from "@/models/aladinBook.model";

interface Props {
  books: AladinBook[];
}
const MainBest = ({ books }: Props) => {
  return (
    <MainBestStyle>
      {books.map((book, i) => (
        <BestBookItem key={book.itemId} book={book} itemIdx={i} />
      ))}
    </MainBestStyle>
  );
};

export const MainBestStyle = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 1.5rem;

  @media ${({ theme }) => theme.mediaQuery.mobile} {
    grid-template-columns: repeat(2, 1fr);
  }

  @media ${({ theme }) => theme.mediaQuery.tablet} {
    grid-template-columns: repeat(3, 1fr);
  }

  @media ${({ theme }) => theme.mediaQuery.desktop} {
    grid-template-columns: repeat(5, 1fr);
  }
`;

export default MainBest;
