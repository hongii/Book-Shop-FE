import { forwardRef, ForwardedRef } from "react";
import styled from "styled-components";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  placeholder?: string;
  $isError?: boolean;
}

const InputText = (
  { placeholder, $isError: isError = false, ...props }: Props,
  ref: ForwardedRef<HTMLInputElement>,
) => {
  return (
    <InputTextStyle
      ref={ref}
      placeholder={placeholder}
      $isError={isError}
      {...props}
    ></InputTextStyle>
  );
};

const InputTextStyle = styled.input<Props>`
  padding: 0.25rem 0.75rem;
  border: 1px solid ${({ theme, $isError: isError }) => (isError ? "red" : theme.color.border)};
  border-radius: ${({ theme }) => theme.borderRadius.default};
  font-size: 1rem;
  line-height: 1.5;
  color: ${({ theme }) => theme.color.inputText};
`;

export default forwardRef(InputText);
