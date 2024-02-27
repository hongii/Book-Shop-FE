export const contactRegex: RegExp = /^(\d{3}-\d{3}-\d{4}|\d{3}-\d{4}-\d{4})$/;
export const emailRegex: RegExp = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
export const passwordRegex: RegExp =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@!^%*#?&])[A-Za-z\d@!^%*#?&]{8,16}$/;
