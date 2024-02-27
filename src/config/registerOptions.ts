import { contactRegex, emailRegex, passwordRegex } from "../constants/regexPatterns";

export const emailOptions = {
  required: { value: true, message: "이메일은 필수 입력 정보입니다." },
  pattern: { value: emailRegex, message: "이메일 형식에 맞게 입력해 주세요." },
};

export const passwordOptions = {
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
};

export const contactOptions = {
  required: { value: true, message: "연락처는 필수 입력 정보입니다." },
  pattern: {
    value: contactRegex,
    message: "000-0000-0000 형태로 '-'기호를 사용해 주세요.",
  },
};
