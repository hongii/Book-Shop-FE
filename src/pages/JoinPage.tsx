import styled from "styled-components";
import Title from "../components/common/Title";
import InputText from "../components/common/InputText";
import Button from "../components/common/Button";
import { Link, useNavigate } from "react-router-dom";
import { FaSignInAlt } from "@react-icons/all-files/fa/FaSignInAlt";
import { FaWhmcs } from "@react-icons/all-files/fa/FaWhmcs";
import { useForm } from "react-hook-form";
import { join } from "../api/auth.api";
import { useState } from "react";
import { useAlert } from "../hooks/useAlert";

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

  const contactRegex = /^(\d{3}-\d{3}-\d{4}|\d{3}-\d{4}-\d{4})$/;
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@!^%*#?&])[A-Za-z\d@!^%*#?&]{8,16}$/;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value !== emailCheck) {
      setEmailCheck("");
    }
  };

  const onSubmit = async (data: JoinProps) => {
    try {
      const res = await join(data);
      setEmailCheck("");
      showAlert(res.data.message);
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
        <form onSubmit={handleSubmit(onSubmit)}>
          <fieldset>
            <InputText
              placeholder="이름을 입력해주세요."
              type="text"
              {...register("name", { required: true, minLength: 2 })}
            />
            {errors.name?.type === "required" && (
              <small className="error-text">이름은 필수 입력 정보입니다.</small>
            )}
            {errors.name?.type === "minLength" && (
              <small className="error-text">2글자 이상 입력해야 합니다.</small>
            )}
          </fieldset>
          <fieldset>
            <InputText
              placeholder="가입할 이메일을 입력해주세요."
              type="email"
              {...register("email", {
                required: true,
                pattern: emailRegex,
                onChange: handleChange,
              })}
            />
            {errors.email?.type === "required" && (
              <small className="error-text">이메일은 필수 입력 정보입니다.</small>
            )}
            {errors.email?.type === "pattern" && (
              <small className="error-text">이메일 형식에 맞게 입력해 주세요.</small>
            )}
            {!errors.email && emailCheck && <small className="error-text">{emailCheck}</small>}
          </fieldset>
          <fieldset>
            <InputText
              placeholder="비밀번호를 입력해주세요."
              type="password"
              {...register("password", {
                required: true,
                minLength: 8,
                maxLength: 16,
                pattern: passwordRegex,
              })}
            />
            {errors.password?.type === "required" && (
              <small className="error-text">비밀번호는 필수 입력 정보입니다.</small>
            )}
            {(errors.password?.type === "pattern" ||
              errors.password?.type === "minLength" ||
              errors.password?.type === "maxLength") && (
              <small className="error-text">
                8~16자의 영문 대/소문자, 숫자, 특수문자를 사용해 주세요.
              </small>
            )}
          </fieldset>
          <fieldset>
            <InputText
              placeholder="연락처를 입력해주세요."
              type="tel"
              {...register("contact", {
                required: true,
                pattern: contactRegex,
              })}
            />
            {errors.contact?.type === "required" && (
              <small className="error-text">연락처는 필수 입력 정보입니다.</small>
            )}
            {errors.contact?.type === "pattern" && (
              <small className="error-text">000-0000-0000 형태로 "-"기호를 사용해 주세요.</small>
            )}
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

const JoinPageStyle = styled.div`
  max-width: ${({ theme }) => theme.layout.width.small};
  margin: 80px auto;

  fieldset {
    border: none;
    margin: 0;
    padding: 0;
    padding-top: 10px;

    .error-text {
      color: red;
    }

    input,
    button {
      width: 100%;
    }
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
