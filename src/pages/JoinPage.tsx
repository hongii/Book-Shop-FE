import styled from "styled-components";
import Title from "../components/common/Title";
import InputText from "../components/common/InputText";
import Button from "../components/common/Button";
import { Link, useNavigate } from "react-router-dom";
import { FaWhmcs } from "@react-icons/all-files/fa/FaWhmcs";
import { FaSignInAlt } from "@react-icons/all-files/fa/FaSignInAlt";
import { useForm } from "react-hook-form";
import { join } from "../api/auth.api";
import { useState } from "react";
import { useAlert } from "../hooks/useAlert";
import { emailOptions, passwordOptions, contactOptions } from "../config/registerOptions";
export interface JoinProps {
  email: string;
  password: string;
  name: string;
  contact: string;
}

const JoinPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<JoinProps>();

  const [emailCheck, setEmailCheck] = useState("");
  const navigate = useNavigate();
  const showAlert = useAlert();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value !== emailCheck) {
      setEmailCheck("");
    }
  };

  const onSubmit = async (data: JoinProps) => {
    try {
      const { message } = await join(data);
      setEmailCheck("");
      showAlert(message);
      navigate("/login");
    } catch (err: any) {
      const { message: errMsg } = err.response.data;
      setEmailCheck(errMsg);
    }
  };

  return (
    <>
      <JoinPageStyle>
        <Title size="large">회원가입</Title>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <fieldset>
            <InputText
              placeholder="이름을 입력해주세요."
              type="text"
              isError={errors.name ? true : false}
              {...register("name", {
                required: { value: true, message: "이름은 필수 입력 정보입니다." },
                minLength: { value: 2, message: "2글자 이상 입력해야 합니다." },
              })}
            />
            {errors.name && <small className="error-text">{errors.name.message}</small>}
          </fieldset>
          <fieldset>
            <InputText
              placeholder="가입할 이메일을 입력해주세요."
              type="text"
              isError={errors.email || (!errors.email && emailCheck) ? true : false}
              {...register("email", {
                ...emailOptions,
                onChange: handleChange,
              })}
            />
            {errors.email && <small className="error-text">{errors.email.message}</small>}
            {!errors.email && emailCheck && <small className="error-text">{emailCheck}</small>}
          </fieldset>
          <fieldset>
            <InputText
              placeholder="비밀번호를 입력해주세요."
              type="password"
              isError={errors.password ? true : false}
              {...register("password", passwordOptions)}
            />
            {errors.password && <small className="error-text">{errors.password.message}</small>}
          </fieldset>
          <fieldset>
            <InputText
              placeholder="연락처를 입력해주세요."
              type="tel"
              isError={errors.contact ? true : false}
              {...register("contact", contactOptions)}
            />
            {errors.contact && <small className="error-text">{errors.contact.message}</small>}
          </fieldset>
          <fieldset>
            <Button type="submit" size="medium" scheme="primary">
              회원가입
            </Button>
          </fieldset>
          <fieldset className="sub-link">
            <div className="login-link">
              이미 가입되어 있으신가요?&nbsp;&nbsp;&nbsp;
              <Link to="/login">
                <FaSignInAlt />
                &nbsp;로그인 하기
              </Link>
            </div>
            <div className="reset-link">
              비밀번호를 변경하실 건가요?&nbsp;&nbsp;&nbsp;
              <Link to="/reset">
                <FaWhmcs />
                &nbsp;비밀번호 초기화
              </Link>
            </div>
          </fieldset>
        </form>
      </JoinPageStyle>
    </>
  );
};

export const JoinPageStyle = styled.div`
  max-width: ${({ theme }) => theme.layout.width.small};
  margin: 80px auto;

  fieldset {
    border: none;
    margin: 0;
    padding: 0;
    padding-top: 10px;

    input,
    button {
      width: 100%;
    }
  }

  .error-text {
    color: red;
  }

  .login-link,
  .reset-link {
    a {
      text-decoration: none;
      font-weight: bold;

      &:hover {
        opacity: 0.8;
      }
    }
  }
`;

export default JoinPage;
