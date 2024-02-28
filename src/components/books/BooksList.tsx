import React from "react";
import styled from "styled-components";
import { Book } from "../../models/book.model";
import BookItem from "./BookItem";

const dummyBook: Book = {
  id: 1,
  title: "Dummy Book",
  imgUrl: 5,
  categoryId: 1,
  summary: "Dummy Summary",
  author: "Dummy Author",
  price: 10000,
  likes: 2,
  detail: "Dummy Details",
  isbn: "123456789",
  form: "paper",
  pages: 100,
  publishedDate: "2021-03-12",
  contents: "Dummy contents",
};

const BooksList = () => {
  return (
    <BooksListStyle>
      <BookItem book={dummyBook} />
    </BooksListStyle>
  );
};

const BooksListStyle = styled.section``;
export default BooksList;
