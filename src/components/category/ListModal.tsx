import { Link } from "react-router-dom";
import styled from "styled-components";
import { useCategory } from "@/hooks/useCategory";

const ListModal = () => {
  const { categories, isCategoriesLoading } = useCategory();

  if (isCategoriesLoading || !categories) {
    return null;
  }

  return (
    <ListModalStyle>
      <nav className="category">
        <div className="rhombus"></div>
        <ul>
          <h2>도서 카테고리</h2>
          {categories.map((item) => {
            return (
              <li key={item.categoryId}>
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
    left: -4.5rem;
    top: 2.8rem;
    width: 150px;
    z-index: 100;

    background-color: ${({ theme }) => theme.color.background};
    box-shadow: ${({ theme }) => theme.borderShadow.listShadow};
    border-radius: 6px;
    border: 1px solid #e0e0e0;
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
  }

  .rhombus::before {
    display: inline-block;
    position: absolute;
    content: "";
    width: 20px;
    height: 20px;
    top: -11px;
    left: 20px;
    transform: rotate(45deg);
    background-color: ${({ theme }) => theme.color.background};
    border: 1px solid ${({ theme }) => theme.color.border};
    border-right: none;
    border-bottom: none;
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
      background-color: ${({ theme }) => theme.color.backgroundRGBA};
    }

    a {
      padding: 10px;
      display: block;
    }
  }
`;

export default ListModal;
