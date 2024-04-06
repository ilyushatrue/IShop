import { LockOutlined } from "@mui/icons-material";
import {
  Button,
} from "@mui/material";
import { Formik, Field, Form } from "formik";
import { IFormField } from "../Authentication";
import Template from "../Base/Template";
interface IProps {
  fields: IFormField[];
}
export default function Register({ fields }: IProps) {
  return (
    <Template avatarChildren={<LockOutlined />} fields={fields} title="Регистрация">
      <Button
        type="submit"
        disableElevation
        variant="contained"
        sx={{
          marginTop: 4,
          marginBottom: 3,
          marginX: "auto",
          minWidth: "50%",
          borderRadius: 4,
        }}
      >
        Зарегистрироваться
      </Button>
    </Template>
  );
}
