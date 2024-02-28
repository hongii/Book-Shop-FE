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
import { emailOptions, passwordOptions } from "../config/registerOptions";

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

  const [loginCheckMsg, setLoginCheckMsg] = useState("");
  const { storeLogin } = useAuthStore();

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value !== loginCheckMsg) {
      setLoginCheckMsg("");
    }
  };

  const onSubmit = async (data: LoginProps) => {
    try {
      const { id, email, name, contact, accessToken } = await login(data);
      storeLogin(accessToken);
      setLoginCheckMsg("");
      navigate("/");
    } catch (err: any) {
      const { message: errMsg } = err.response.data;
      setLoginCheckMsg(errMsg);
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
                ...emailOptions,
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
              {...register("password", { ...passwordOptions, onChange: handleChange })}
            />
            {errors.password && <small className="error-text">{errors.password.message}</small>}
          </fieldset>
          {!errors.email && !errors.password && loginCheckMsg && (
            <small className="error-text">{loginCheckMsg}</small>
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
