import { LockOutlined } from "@mui/icons-material";
import {
  Avatar,
  BaseTextFieldProps,
  Box,
  Button,
  Checkbox,
  FilledTextFieldProps,
  FormControlLabel,
  Link,
  SxProps,
  TextField,
  Typography,
} from "@mui/material";
import React, { CSSProperties, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IFormField } from "../Authentication";
import Template from "../Base/Template";

interface IProps {
  fields: IFormField[];
}
export default function Login({ fields }: IProps) {
  const [isRememberMeChecked, setIsRememberMeChecked] = useState(false);
  const navigate = useNavigate();
  function handleRememberMeChange() {
    setIsRememberMeChecked((prev) => !prev);
  }
  function handleForgotPassword() {
    navigate("/register");
  }

  return (
    <Template fields={fields} avatarChildren={<LockOutlined />} title={"Логин"}>
      <FormControlLabel
        control={
          <Checkbox
            checked={isRememberMeChecked}
            onChange={handleRememberMeChange}
            name="rememberMe"
            color="primary"
          />
        }
        label={<Typography variant="body2">Запомнить</Typography>}
      />
      <Button
        type="submit"
        disableElevation
        variant="contained"
        sx={{
          marginTop: 4,
          marginBottom: 3,
          marginX: "auto",
          width: "50%",
          borderRadius: 3,
        }}
      >
        Войти
      </Button>
      <Typography sx={{ cursor: "pointer" }} variant="body2">
        Забыли пароль?
        <Link onClick={handleForgotPassword} marginLeft={1}>
          Восстановить
        </Link>
      </Typography>
      <Typography sx={{ cursor: "pointer" }} variant="body2">
        Нет аккаунта?
        <Link onClick={handleForgotPassword} marginLeft={1}>
          Зарегистрироваться
        </Link>
      </Typography>
    </Template>
  );
}
