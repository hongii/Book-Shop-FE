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
  font-size: ${({ theme, size }) => theme.buttonSize[size].fontSize};
  padding: ${({ theme, size }) => theme.buttonSize[size].padding};
  color: ${({ theme, scheme }) => theme.buttonScheme[scheme].color};
  background-color: ${({ theme, scheme }) => theme.buttonScheme[scheme].backgroundColor};
  border-radius: ${({ theme }) => theme.borderRadius.default};
  border: 0;
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
  pointer-events: ${({ disabled }) => (disabled ? "none" : "auto")};
  cursor: ${({ disabled }) => (disabled ? "none" : "pointer")};
`;

export default Button;
