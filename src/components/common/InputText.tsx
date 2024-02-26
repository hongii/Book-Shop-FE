import { forwardRef, ForwardedRef } from "react";
import styled from "styled-components";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  placeholder?: string;
}

const InputText = (
  { placeholder, onChange, ...props }: Props,
  ref: ForwardedRef<HTMLInputElement>,
) => {
  return (
    <InputTextStyle
      ref={ref}
      placeholder={placeholder}
      onChange={onChange}
      {...props}
    ></InputTextStyle>
  );
};

const InputTextStyle = styled.input`
  padding: 0.25rem 0.75rem;
  border: 1px solid ${({ theme }) => theme.color.border};
  border-radius: ${({ theme }) => theme.borderRadius.default};
  font-size: 1rem;
  line-height: 1.5;
  color: ${({ theme }) => theme.color.inputText};
`;

export default forwardRef(InputText);
