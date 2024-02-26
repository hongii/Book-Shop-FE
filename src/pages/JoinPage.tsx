import React, { useState } from "react";
import styled from "styled-components";
import Title from "../components/common/Title";
import InputText from "../components/common/InputText";
import Button from "../components/common/Button";
import { Link } from "react-router-dom";
import { FaSignInAlt } from "@react-icons/all-files/fa/FaSignInAlt";
import { FaWhmcs } from "@react-icons/all-files/fa/FaWhmcs";

const JoinPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(email, password);
  };

  return (
    <>
      <JoinPageStyle>
        <Title size="large">회원가입</Title>
        <form onSubmit={handleSubmit}>
          <fieldset>
            <InputText
              placeholder="이름을 입력해주세요."
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </fieldset>
          <fieldset>
            <InputText
              placeholder="가입할 이메일을 입력해주세요."
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </fieldset>
          <fieldset>
            <InputText
              placeholder="비밀번호를 입력해주세요."
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </fieldset>
          <fieldset>
            <InputText
              placeholder="연락처를 입력해주세요."
              type="tel"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
            />
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
    padding-left: 0;
    padding-right: 0;

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
