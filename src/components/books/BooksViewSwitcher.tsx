import styled from "styled-components";
import Button from "../common/Button";
import { IoIosList } from "@react-icons/all-files/io/IoIosList";
import { IoGrid } from "@react-icons/all-files/io5/IoGrid";
import { useSearchParams } from "react-router-dom";
import { QUERYSTRING } from "../../constants/querystring";
import { useEffect } from "react";

const viewOptions = [
  {
    value: "grid",
    icon: <IoGrid />,
  },
  {
    value: "list",
    icon: <IoIosList />,
  },
];

export type ViewMode = "grid" | "list";

const BooksViewSwitcher = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleSwitch = (value: ViewMode) => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set(QUERYSTRING.VIEW, value);
    setSearchParams(newSearchParams);
  };

  useEffect(() => {
    if (!searchParams.get(QUERYSTRING.VIEW)) {
      handleSwitch("grid");
    }
  }, []);

  return (
    <BooksViewSwitcherStyle>
      {viewOptions.map((opt) => {
        return (
          <Button
            key={opt.value}
            size="medium"
            scheme={searchParams.get(QUERYSTRING.VIEW) === opt.value ? "primary" : "normal"}
            onClick={() => handleSwitch(opt.value as ViewMode)}
          >
            {opt.icon}
          </Button>
        );
      })}
    </BooksViewSwitcherStyle>
  );
};

const BooksViewSwitcherStyle = styled.div`
  display: flex;
  gap: 4px;
  margin-bottom: 10px;

  button {
    padding: 0.5rem;
  }
`;

export default BooksViewSwitcher;
