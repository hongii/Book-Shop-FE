import React from "react";
import styled from "styled-components";
import { ColorKey, HeadingSize } from "../../style/theme";

interface Props {
  children: React.ReactNode;
  size: HeadingSize;
  color?: ColorKey;
}

const Title = ({ children, size, color }: Props) => {
  return (
    <TitleStyle size={size} color={color}>
      {children}
    </TitleStyle>
  );
};

const TitleStyle = styled.h1<Omit<Props, "children">>`
  color: ${({ theme, color }) => (color ? theme.color[color] : theme.color.primary)};

  @media ${({ theme }) => theme.mediaQuery.mobile} {
    font-size: ${({ theme, size }) => theme.heading.mobile[size].fontSize};
  }

  @media ${({ theme }) => theme.mediaQuery.tablet} {
    font-size: ${({ theme, size }) => theme.heading.tablet[size].fontSize};
  }

  @media ${({ theme }) => theme.mediaQuery.desktop} {
    font-size: ${({ theme, size }) => theme.heading.desktop[size].fontSize};
  }
`;

export default Title;
