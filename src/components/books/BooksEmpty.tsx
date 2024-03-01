import React from "react";
import styled from "styled-components";
import { FaRegGrinBeamSweat } from "@react-icons/all-files/fa/FaRegGrinBeamSweat";
import { HiCursorClick } from "@react-icons/all-files/hi/HiCursorClick";
import Title from "../common/Title";
import { Link } from "react-router-dom";

interface Props {
  message: string;
}

const BooksEmpty = ({ message }: Props) => {
  return (
    <BooksEmptyStyle>
      <div className="icon">
        <FaRegGrinBeamSweat />
      </div>
      <Title size="large" color="secondary">
        {message}
      </Title>
      <p>
        <Link to="/books">
          <HiCursorClick />
          &nbsp; 전체 도서 목록 보러가기
        </Link>
      </p>
    </BooksEmptyStyle>
  );
};

const BooksEmptyStyle = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 120px 0;

  .icon {
    svg {
      font-size: 4rem;
      color: ${({ theme }) => theme.color.secondary};
      /* fill: ${({ theme }) => theme.color.secondary}; */
    }
  }

  a {
    display: flex;
    align-items: center;

    &:hover {
      opacity: 0.8;
    }
  }
`;

export default BooksEmpty;
