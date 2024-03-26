import styled from "styled-components";
import BookItem from "@/components/books/BookItem";
import { AladinBook } from "@/models/aladinBook.model";
import { MainBestStyle } from "./MainBest";

interface Props {
  books: AladinBook[];
}
const MainNewBooks = ({ books }: Props) => {
  return (
    <MainNewBooksStyle>
      {books.map((book) => (
        <BookItem key={book.itemId} book={book} view="grid" />
      ))}
    </MainNewBooksStyle>
  );
};

const MainNewBooksStyle = styled(MainBestStyle)``;

export default MainNewBooks;
