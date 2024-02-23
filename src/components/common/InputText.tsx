import { forwardRef, ForwardedRef } from "react";
import styled from "styled-components";

interface Props {
  placeholder?: string;
}

const InputText = ({ placeholder }: Props, ref: ForwardedRef<HTMLInputElement>) => {
  return <InputTextStyle ref={ref} placeholder={placeholder}></InputTextStyle>;
};

const InputTextStyle = styled.input.attrs({ type: "text" })`
  padding: 0.25rem 0.75rem;
  border: 1px solid ${({ theme }) => theme.color.border};
  border-radius: ${({ theme }) => theme.borderRadius};
  font-size: 1rem;
  line-height: 1.5;
  color: ${({ theme }) => theme.color.text};
`;

export default forwardRef(InputText);
