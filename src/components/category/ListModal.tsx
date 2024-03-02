import { Link } from "react-router-dom";
import styled from "styled-components";
import { useCategory } from "../../hooks/useCategory";
import { useEffect, useRef, useState } from "react";
import useOnClickOutside from "../../hooks/useOnClickOutside";

interface Props {
  setModalOpen: (isOpen: boolean) => void;
  modalOpen: boolean;
}
const ListModal = ({ setModalOpen, modalOpen }: Props) => {
  const { category } = useCategory();
  // const ref = useRef(null);

  return (
    <ListModalStyle>
      <nav className="category">
        <ul>
          <h2>도서 카테고리</h2>
          {category.map((item) => {
            return (
              <li key={item.categoryId} onClick={() => setModalOpen(false)}>
                <Link
                  to={`/books${
                    item.categoryId !== null ? `?page=1&category_id=${item.categoryId}` : "?page=1"
                  }`}
                >
                  {item.categoryName}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </ListModalStyle>
  );
};

const ListModalStyle = styled.div`
  position: relative;

  .category {
    position: absolute;
    left: -2.4rem;
    top: 1.5rem;
    width: 150px;
    z-index: 100;

    background: ${({ theme }) => theme.color.background};
    box-shadow: ${({ theme }) => theme.borderShadow.listShadow};
    border-radius: 6px;
  }

  ul {
    margin: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
    height: 100%;
    width: 100%;
    /* border-radius: ${({ theme }) => theme.borderRadius.default}; */
  }

  h2 {
    padding: 6px;
    font-size: 1.5rem;
    font-weight: 600;
    border-bottom: 2px solid ${({ theme }) => theme.color.border};
  }

  li {
    text-align: center;
    cursor: pointer;
    width: 100%;
    font-size: 1.3rem;
    font-weight: 600;
    color: ${({ theme }) => theme.color.text};
    border-radius: 6px;
    transition: opacity 0.2s ease;

    &:hover {
      background: ${({ theme }) => theme.color.backgroundRGBA};
    }

    a {
      padding: 10px;
      display: block;
    }
  }
`;

export default ListModal;
