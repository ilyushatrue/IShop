import { Avatar, Box, FilledTextFieldProps, TextField } from "@mui/material";
import React, { CSSProperties, ReactNode } from "react";
import { IFormField } from "../Authentication";

const containerStyle: CSSProperties = {
  padding: 36,
  width: "90vw",
  maxWidth: "380px",
  margin: "24px auto",
  backgroundColor: "white",
  border: "4px solid secondary.light",
  borderRadius: 50,
  boxShadow: "0px 0px 24px rgba(0,0,0,0.05)",
};

const textFieldProps: FilledTextFieldProps = {
  variant: "filled",
  fullWidth: true,
  sx: {
    input: {
      bgcolor: "white",
    },
  },
};

const avatarStyle: CSSProperties = {
  height: 48,
  width: 48,
};

interface IProps {
  children: ReactNode;
  title: string;
  avatarChildren: ReactNode;
  fields: IFormField[];
}
export default function Template({
  avatarChildren,
  title,
  children,
  fields,
}: IProps) {
  return (
    <Box>
      <Box
        style={containerStyle}
        sx={{
          display: "flex",
          justifyContent: "start",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Avatar style={avatarStyle} sx={{ bgcolor: "secondary.light" }}>
          {avatarChildren}
        </Avatar>
        <h2>{title}</h2>
        <Box
          display={"flex"}
          flexDirection={"column"}
          alignItems={"start"}
          gap={1}
          width={"100%"}
        >
          {fields.map((field, index) => (
            <TextField
              {...textFieldProps}
			  key={index}
              label={field.label}
              placeholder={field.placeholder}
              required={field.isRequired}
              type={field.type}
            />
          ))}
        </Box>
        <Box
          display={"flex"}
          flexDirection={"column"}
          alignItems={"start"}
          width={"100%"}
          gap={0.5}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
}
