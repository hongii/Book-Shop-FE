import { LIMIT, QUERYSTRING } from "../../constants/querystring";
import { Pagination } from "../../models/pagination.model";
import styled from "styled-components";
import Button from "../common/Button";
import { useSearchParams } from "react-router-dom";

interface Props {
  pagination: Pagination;
}

const Page = ({ pagination }: Props) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { totalBooks, page } = pagination;
  const totalPages: number = Math.ceil(totalBooks / LIMIT);

  const handleClickPage = (pageNumber: number) => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set(QUERYSTRING.PAGE, pageNumber.toString());
    setSearchParams(newSearchParams);
  };

  return (
    <PageStyle>
      {totalPages > 0 && (
        <ol>
          {Array(totalPages)
            .fill(0)
            .map((_, i) => (
              <li key={i}>
                <Button
                  size="small"
                  scheme={page === i + 1 ? "primary" : "normal"}
                  onClick={() => handleClickPage(i + 1)}
                >
                  {i + 1}
                </Button>
              </li>
            ))}
        </ol>
      )}
    </PageStyle>
  );
};

const PageStyle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 24px 0;

  ol {
    list-style: none;
    display: flex;
    gap: 8px;
    padding: 0;
    margin: 0;
  }
`;

export default Page;
