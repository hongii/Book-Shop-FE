import { Link } from "react-router-dom";
import styled from "styled-components";
import { useCategory } from "@/hooks/useCategory";

const Category = () => {
  const { categories, isCategoriesLoading } = useCategory();

  if (isCategoriesLoading || !categories) {
    return null;
  }

  return (
    <CategoryStyle>
      <ul className="category-list">
        <h2>도서 카테고리</h2>
        {categories.map((item) => {
          return (
            <li key={item.categoryId}>
              <Link
                to={`/books${
                  item.categoryId !== null
                    ? `?page=1&view=grid&category_id=${item.categoryId}`
                    : "?page=1&view=grid"
                }`}
              >
                {item.categoryName}
              </Link>
            </li>
          );
        })}
      </ul>
    </CategoryStyle>
  );
};

const CategoryStyle = styled.div`
  .category-list {
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    white-space: nowrap;

    h2 {
      padding: 0.8rem;
      font-size: 1.6rem;
      font-weight: 600;
      border-bottom: 2px solid ${({ theme }) => theme.color.border};
      color: ${({ theme }) => theme.color.third};
    }

    li {
      width: 100%;
      white-space: nowrap;
      text-align: center;
      cursor: pointer;
      font-size: 1.3rem;
      font-weight: 600;
      color: ${({ theme }) => theme.color.text};
      border-radius: ${({ theme }) => theme.borderRadius.default};
      transition: opacity 0.2s ease;

      &:hover {
        background-color: ${({ theme }) => theme.color.backgroundRGBA};
      }

      a {
        padding: 0.8rem;
        display: block;
      }
    }
  }

  @media ${({ theme }) => theme.mediaQuery.mobile} {
    .category-list {
      h2 {
        font-size: 2.5rem;
      }
      a {
        font-size: 2.2rem;
      }
    }
  }
  @media ${({ theme }) => theme.mediaQuery.tablet} {
    .category-list {
      h2 {
        font-size: 2rem;
      }
      a {
        font-size: 1.6rem;
      }
    }
  }
`;

export default Category;
