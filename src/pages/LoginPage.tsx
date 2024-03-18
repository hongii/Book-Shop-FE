import Title from "@/components/common/Title";
import InputText from "@/components/common/InputText";
import Button from "@/components/common/Button";
import { Link } from "react-router-dom";
import { FaRegUser } from "@react-icons/all-files/fa/FaRegUser";
import { FaWhmcs } from "@react-icons/all-files/fa/FaWhmcs";
import { useForm } from "react-hook-form";
import { JoinPageStyle } from "@/pages/JoinPage";
import { emailOptions, passwordOptions } from "@/config/registerOptions";
import { useAuth } from "@/hooks/useAuth";

export interface LoginProps {
  email: string;
  password: string;
}

const LoginPage = () => {
  const { errorMsg, userLogin } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginProps>();

  const onSubmit = async (data: LoginProps) => {
    await userLogin(data);
  };

  return (
    <JoinPageStyle>
      <div className="container">
        <Title size="large">로그인</Title>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <fieldset>
            <InputText
              placeholder="이메일을 입력해주세요."
              type="email"
              inputMode="email"
              $isError={!errorMsg && errors.email ? true : false}
              {...register("email", emailOptions)}
            />
            {!errorMsg && errors.email && (
              <small className="error-text">{errors.email.message}</small>
            )}
          </fieldset>
          <fieldset>
            <InputText
              placeholder="비밀번호를 입력해주세요."
              type="password"
              inputMode="text"
              $isError={!errorMsg && errors.password ? true : false}
              {...register("password", passwordOptions)}
            />
            {!errorMsg && errors.password && (
              <small className="error-text">{errors.password.message}</small>
            )}
          </fieldset>
          {errorMsg && <small className="error-text">{errorMsg}</small>}

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
                회원가입 하기
              </Link>
            </div>
            <div className="reset-link">
              비밀번호를 변경하실 건가요?&nbsp;&nbsp;&nbsp;
              <Link to="/reset">
                <FaWhmcs />
                비밀번호 초기화
              </Link>
            </div>
          </fieldset>
        </form>
      </div>
    </JoinPageStyle>
  );
};

export default LoginPage;
