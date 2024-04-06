import { HTMLInputTypeAttribute } from "react";
import Register from "./Register/Register";
import Login from "./Login/Login";
import { TextField } from "@mui/material";

export interface IFormField {
  label: string;
  placeholder: string;
  type?: HTMLInputTypeAttribute;
  isRequired?: boolean;
}
<TextField
  label="Пароль"
  sx={{ bgcolor: "white" }}
  fullWidth
  variant="filled"
  placeholder="Введите пароль"
  type="password"
  required
/>;

const loginFields: IFormField[] = [
  {
    label: "Логин",
    placeholder: "Введите номер телефона или email",
    isRequired: true,
  },
  {
    label: "Пароль",
    placeholder: "Введите пароль",
    isRequired: true,
    type: "password",
  },
];

const registerFields: IFormField[] = [
  {
    label: "Имя",
    placeholder: "Введите имя",
    isRequired: true,
  },
  {
    label: "Фамилия",
    placeholder: "Введите фамилию",
  },
  {
    label: "Номер телефона",
    placeholder: "Введите номер телефона",
    isRequired: true,
  },
  {
    label: "Email",
    placeholder: "Введите email",
  },
  {
    label: "Пароль",
    placeholder: "Введите пароль",
    isRequired: true,
    type: "password",
  },
  {
    label: "Повторный пароль",
    placeholder: "Повторите пароль",
    isRequired: true,
    type: "password",
  },
];

interface IProps {
  isRegistered?: boolean;
}
export default function Authentication({ isRegistered = false }: IProps) {
  return (
    <>
      {isRegistered ? (
        <Login fields={loginFields} />
      ) : (
        <Register fields={registerFields} />
      )}
    </>
  );
}
