import Title from "../components/common/Title";
import InputText from "../components/common/InputText";
import Button from "../components/common/Button";
import { Link, useNavigate } from "react-router-dom";
import { FaSignInAlt } from "@react-icons/all-files/fa/FaSignInAlt";
import { FaRegUser } from "@react-icons/all-files/fa/FaRegUser";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useAlert } from "../hooks/useAlert";
import { JoinPageStyle } from "./JoinPage";
import { resetPassword, resetPasswordRequest } from "../api/auth.api";

export interface ResetProps {
  email: string;
  password: string;
}

const ResetPasswordPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetProps>();

  const [emailCheckMsg, setEmailCheckMsg] = useState("");
  const [resetRequested, setResetRequested] = useState(false);

  const navigate = useNavigate();
  const showAlert = useAlert();

  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@!^%*#?&])[A-Za-z\d@!^%*#?&]{8,16}$/;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value !== emailCheckMsg) {
      setEmailCheckMsg("");
    }
  };

  const onSubmit = async (data: ResetProps) => {
    try {
      if (resetRequested) {
        // 비밀번호 초기화(비밀번호 변경과정)
        const { message } = await resetPassword(data);
        showAlert(message);
        setResetRequested(false);
        navigate("/login");
      } else {
        // 비밀번호 초기화 요청(가입한 이메일 확인과정)
        await resetPasswordRequest(data);
        setEmailCheckMsg("");
        setResetRequested(true);
      }
    } catch (err: any) {
      const { message: errMsg } = err.response.data;
      setEmailCheckMsg(errMsg);
    }
  };

  return (
    <>
      <JoinPageStyle>
        <Title size="large">비밀번호 초기화</Title>
        <form onSubmit={handleSubmit(onSubmit)}>
          <fieldset>
            <InputText
              placeholder="이메일을 입력해주세요."
              type="email"
              disabled={resetRequested}
              {...register("email", {
                required: true,
                pattern: emailRegex,
                onChange: handleChange,
              })}
            />
            {errors.email?.type === "required" && (
              <small className="error-text">가입한 이메일을 입력해주세요.</small>
            )}
            {errors.email?.type === "pattern" && (
              <small className="error-text">이메일 형식에 맞게 입력해 주세요.</small>
            )}
            {!errors.email && emailCheckMsg && (
              <small className="error-text">{emailCheckMsg}</small>
            )}
          </fieldset>
          {resetRequested && (
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
                <small className="error-text">변경할 비밀번호를 입력해주세요.</small>
              )}
              {(errors.password?.type === "pattern" ||
                errors.password?.type === "minLength" ||
                errors.password?.type === "maxLength") && (
                <small className="error-text">
                  8~16자의 영문 대/소문자, 숫자, 특수문자를 사용해 주세요.
                </small>
              )}
            </fieldset>
          )}
          <fieldset>
            <Button type="submit" size="medium" scheme="primary">
              {resetRequested ? "비밀번호 초기화" : "이메일 확인"}
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
            <div className="login-link">
              이미 가입되어 있으신가요?&nbsp;&nbsp;&nbsp;
              <Link to="/login">
                <FaSignInAlt />
                &nbsp;로그인 하기
              </Link>
            </div>
          </fieldset>
        </form>
      </JoinPageStyle>
    </>
  );
};

export default ResetPasswordPage;
