import { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Button from "./Button";
import { FaAngleDown } from "@react-icons/all-files/fa/FaAngleDown";

interface Props {
  children: React.ReactNode;
  line: number;
}

const EllipsisBox = ({ children, line }: Props) => {
  const [isMore, setIsMore] = useState<boolean>(false);
  const [isOverflow, setIsOverflow] = useState<boolean>(false);
  const [lineCount, setLineCount] = useState<number>(line);
  const textRef = useRef<HTMLParagraphElement>(null);

  const calculateLineCount = useCallback(() => {
    if (textRef.current) {
      const computedStyle = window.getComputedStyle(textRef.current);
      const fontSize = Number(computedStyle.getPropertyValue("font-size").slice(0, -2));

      // 컴포넌트가 마운트될 때 실제 텍스트의 줄 수를 계산
      const textHeight = textRef.current?.clientHeight ?? 1; // 상세 설명이 차지하는 요소의 높이
      console.log(textHeight, Math.round(textHeight / (fontSize * 1.5)));
      return Math.round(textHeight / (fontSize * 1.5));
    }
    return 1;
  }, []);

  useEffect(() => {
    const newLineCount = calculateLineCount();

    // 실제 상세 설명에 보여줄 줄의 개수가 line prop으로 전달된 줄 수보다 많으면 "더보기"버튼 보이도록 설정
    setIsOverflow(newLineCount > line);
    setLineCount(newLineCount);
  }, [line, calculateLineCount]);

  return (
    <EllipsisBoxStyle line={line} $isMore={isMore}>
      <p className={`${isOverflow ? "active" : ""}`} ref={textRef}>
        {children}
      </p>
      {isOverflow && (
        <div className="toggle">
          <Button
            size="small"
            scheme="normal"
            onClick={() => {
              setIsMore((prev) => !prev);
            }}
          >
            <FaAngleDown />
            {isMore ? "접기" : "더보기"}
          </Button>
        </div>
      )}
    </EllipsisBoxStyle>
  );
};

interface EllipsisBoxStyleProps {
  line: number;
  $isMore: boolean;
}
const EllipsisBoxStyle = styled.div<EllipsisBoxStyleProps>`
  .active {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: ${({ line, $isMore }) => ($isMore ? "none" : line)}; /* 보여질 줄의 갯수  */
    -webkit-box-orient: vertical;
  }

  .toggle {
    display: flex;
    justify-content: end;

    svg {
      transform: ${({ $isMore }) => ($isMore ? "rotate(180deg)" : "rotate(0)")};
      transition: transform 0.4s ease;
    }
  }
`;

export default EllipsisBox;
