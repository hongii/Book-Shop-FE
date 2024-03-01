import styled from "styled-components";
import { useCategory } from "../../hooks/useCategory";
import Button from "../common/Button";
import { useSearchParams } from "react-router-dom";
import { QUERYSTRING } from "../../constants/querystring";

const BooksFilter = () => {
  const { category } = useCategory();
  const [searchParams, setSearchParams] = useSearchParams();

  const resetClickedPage = (newSearchParams: URLSearchParams) => {
    newSearchParams.set(QUERYSTRING.PAGE, "1");
    setSearchParams(newSearchParams);
  };

  const handleCategory = (id: number | null) => {
    const newSearchParams = new URLSearchParams(searchParams);

    id
      ? newSearchParams.set(QUERYSTRING.CATEGORY_ID, id.toString())
      : newSearchParams.delete(QUERYSTRING.CATEGORY_ID);
    resetClickedPage(newSearchParams);
    setSearchParams(newSearchParams);
  };

  const handleNews = () => {
    const newSearchParams = new URLSearchParams(searchParams);
    const isNew = newSearchParams.get(QUERYSTRING.NEW);

    isNew ? newSearchParams.delete(QUERYSTRING.NEW) : newSearchParams.set(QUERYSTRING.NEW, "true");
    resetClickedPage(newSearchParams);
    setSearchParams(newSearchParams);
  };

  return (
    <BooksFilterStyle>
      <div className="category">
        {category.map((item) => (
          <Button
            size="medium"
            scheme={item.isActive ? "primary" : "normal"}
            key={item.categoryId}
            onClick={() => handleCategory(item.categoryId)}
          >
            {item.categoryName}
          </Button>
        ))}
      </div>
      <div className="new">
        <Button
          size="medium"
          scheme={searchParams.get(QUERYSTRING.NEW) ? "primary" : "normal"}
          onClick={handleNews}
        >
          최신 도서
        </Button>
      </div>
    </BooksFilterStyle>
  );
};

const BooksFilterStyle = styled.div`
  display: flex;
  gap: 24px;

  .category {
    display: flex;
    gap: 8px;
  }
`;
export default BooksFilter;
