import Title from "@/components/common/Title";
import InputText from "@/components/common/InputText";
import Button from "@/components/common/Button";
import { Link } from "react-router-dom";
import { FaSignInAlt } from "@react-icons/all-files/fa/FaSignInAlt";
import { FaRegUser } from "@react-icons/all-files/fa/FaRegUser";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { JoinPageStyle } from "@/pages/JoinPage";
import { emailOptions, passwordOptions } from "@/config/registerOptions";
import { useAuth } from "@/hooks/useAuth";

export interface ResetProps {
  email: string;
  password: string;
  confirmPassword: string;
}

const ResetPasswordPage = () => {
  const [emailCheckMsg, setEmailCheckMsg] = useState("");
  const { errorMsg, resetRequested, userResetPassword, userResetPasswordRequest } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetProps>();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value !== emailCheckMsg) {
      setEmailCheckMsg("");
    }
  };

  const onSubmit = async (data: ResetProps) => {
    if (resetRequested) {
      // 비밀번호 초기화(비밀번호 변경과정)
      await userResetPassword(data);
    } else {
      // 비밀번호 초기화 요청(가입한 이메일 확인과정)
      await userResetPasswordRequest(data);
      setEmailCheckMsg(data.email);
    }
  };

  return (
    <>
      <JoinPageStyle>
        <div className="container">
          <Title size="large">비밀번호 초기화</Title>
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <fieldset>
              <InputText
                placeholder="이메일을 입력해주세요."
                type="email"
                inputMode="email"
                disabled={resetRequested}
                $isError={errors.email ? true : false}
                {...register("email", {
                  ...emailOptions,
                  onChange: handleChange,
                })}
              />
              {errors.email && <small className="error-text">{errors.email.message}</small>}
              {!errors.email && emailCheckMsg && <small className="error-text">{errorMsg}</small>}
            </fieldset>
            {resetRequested && (
              <>
                <fieldset>
                  <InputText
                    placeholder="새로운 비밀번호를 입력해주세요."
                    type="password"
                    inputMode="text"
                    $isError={errors.password ? true : false}
                    {...register("password", passwordOptions)}
                  />
                  {errors.password && (
                    <small className="error-text">{errors.password.message}</small>
                  )}
                </fieldset>
                <fieldset>
                  <InputText
                    placeholder="새로운 비밀번호를 한번 더 입력해주세요."
                    type="password"
                    inputMode="text"
                    $isError={errors.confirmPassword ? true : false}
                    {...register("confirmPassword", {
                      ...passwordOptions,
                      validate: (value, formValues) => {
                        return (
                          value === formValues.password || "입력하신 비밀번호가 일치하지 않습니다."
                        );
                      },
                    })}
                  />
                  {errors.confirmPassword && (
                    <small className="error-text">{errors.confirmPassword.message}</small>
                  )}
                </fieldset>
              </>
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
                  회원가입 하기
                </Link>
              </div>
              <div className="login-link">
                이미 가입되어 있으신가요?&nbsp;&nbsp;&nbsp;
                <Link to="/login">
                  <FaSignInAlt />
                  로그인 하기
                </Link>
              </div>
            </fieldset>
          </form>
        </div>
      </JoinPageStyle>
    </>
  );
};

export default ResetPasswordPage;
