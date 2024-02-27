import Title from "../components/common/Title";
import InputText from "../components/common/InputText";
import Button from "../components/common/Button";
import { Link, useNavigate } from "react-router-dom";
import { FaRegUser } from "@react-icons/all-files/fa/FaRegUser";
import { FaWhmcs } from "@react-icons/all-files/fa/FaWhmcs";
import { useForm } from "react-hook-form";
import { login } from "../api/auth.api";
import { useState } from "react";
import { JoinPageStyle } from "./JoinPage";
import { useAuthStore } from "../store/authStore";
import { emailRegex, passwordRegex } from "../constants/regexPatterns";

export interface LoginProps {
  email: string;
  password: string;
}

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginProps>();

  const [emailCheck, setEmailCheck] = useState("");
  const { isLoggedIn, storeLogin } = useAuthStore();

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value !== emailCheck) {
      setEmailCheck("");
    }
  };

  const onSubmit = async (data: LoginProps) => {
    try {
      const { id, email, name, contact, accessToken } = await login(data);
      console.log(id, email, name, contact, accessToken);
      storeLogin(accessToken);
      setEmailCheck("");
      navigate("/");
    } catch (err: any) {
      console.log(err);
      const { message: errMsg } = err.response.data;
      setEmailCheck(errMsg);
    }
  };

  return (
    <>
      <JoinPageStyle>
        <Title size="large">로그인</Title>
        <form onSubmit={handleSubmit(onSubmit)}>
          <fieldset>
            <InputText
              placeholder="이메일을 입력해주세요."
              isError={errors.email ? true : false}
              {...register("email", {
                required: { value: true, message: "이메일은 필수 입력 정보입니다." },
                pattern: { value: emailRegex, message: "이메일 형식에 맞게 입력해 주세요." },
                onChange: handleChange,
              })}
            />
            {errors.email && <small className="error-text">{errors.email.message}</small>}
          </fieldset>
          <fieldset>
            <InputText
              placeholder="비밀번호를 입력해주세요."
              type="password"
              isError={errors.password ? true : false}
              {...register("password", {
                required: { value: true, message: "비밀번호는 필수 입력 정보입니다." },
                minLength: {
                  value: 8,
                  message: "8~16자의 영문 대/소문자, 숫자, 특수문자를 사용해 주세요.",
                },
                maxLength: {
                  value: 16,
                  message: "8~16자의 영문 대/소문자, 숫자, 특수문자를 사용해 주세요.",
                },
                pattern: {
                  value: passwordRegex,
                  message: "8~16자의 영문 대/소문자, 숫자, 특수문자를 사용해 주세요.",
                },
              })}
            />
            {errors.password && <small className="error-text">{errors.password.message}</small>}
          </fieldset>
          {!errors.email && !errors.password && emailCheck && (
            <small className="error-text">{emailCheck}</small>
          )}

          <fieldset>
            <Button type="submit" size="medium" scheme="primary">
              로그인
            </Button>
          </fieldset>
          <fieldset className="sub-link">
            <div className="reset-link">
              아직 회원이 아니신가요?&nbsp;&nbsp;&nbsp;
              <Link to="/join">
                <FaRegUser />
                &nbsp;회원가입 하기
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

export default LoginPage;
