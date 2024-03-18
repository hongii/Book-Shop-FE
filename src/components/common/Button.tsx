import React from "react";
import styled from "styled-components";
import { ButtonScheme, ButtonSize } from "../../style/theme";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  size: ButtonSize;
  scheme: ButtonScheme;
  isLoading?: boolean;
}

const Button = ({ children, size, scheme, isLoading, ...props }: Props) => {
  return (
    <ButtonStyle size={size} scheme={scheme} {...props}>
      {children}
    </ButtonStyle>
  );
};

const ButtonStyle = styled.button<Omit<Props, "children">>`
  white-space: nowrap;
  color: ${({ theme, scheme }) => theme.buttonScheme[scheme].color};
  background-color: ${({ theme, scheme }) => theme.buttonScheme[scheme].backgroundColor};
  border-radius: ${({ theme }) => theme.borderRadius.default};
  border: 0;
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
  pointer-events: ${({ disabled }) => (disabled ? "none" : "auto")};
  cursor: ${({ disabled }) => (disabled ? "none" : "pointer")};

  @media ${({ theme }) => theme.mediaQuery.mobile} {
    font-size: ${({ theme, size }) => theme.buttonSize.mobile[size].fontSize};
    padding: ${({ theme, size }) => theme.buttonSize.mobile[size].padding};
  }

  @media ${({ theme }) => theme.mediaQuery.tablet} {
    font-size: ${({ theme, size }) => theme.buttonSize.tablet[size].fontSize};
    padding: ${({ theme, size }) => theme.buttonSize.tablet[size].padding};
  }

  @media ${({ theme }) => theme.mediaQuery.desktop} {
    font-size: ${({ theme, size }) => theme.buttonSize.desktop[size].fontSize};
    padding: ${({ theme, size }) => theme.buttonSize.desktop[size].padding};
  }
`;

export default Button;
