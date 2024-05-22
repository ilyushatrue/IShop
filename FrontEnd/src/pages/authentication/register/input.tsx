import { Button, TextField } from "@mui/material";
import React from "react";
import {
	Controller,
	SubmitHandler,
	useController,
	useForm,
} from "react-hook-form";
import { loginValidation } from "./validation";

type RegisterForm = {
	firstName: string;
	lastName: string;
	phone: string;
	email: string;
	password: string;
	confirmPassword: string;
};
export default function Input() {
	const {
		handleSubmit,
		register,
		control,
		formState: { errors },
	} = useForm<RegisterForm>({
		mode: "onChange",
		reValidateMode: "onBlur",
		defaultValues: {
			firstName: "",
			lastName: "",
			phone: "",
			email: "",
			password: "",
			confirmPassword: "",
		},
	});

	const onSubmit: SubmitHandler<RegisterForm> = (data) => {
		console.log(data);
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<Controller
				control={control}
				name={"firstName"}
				render={({ field }) => (
					<TextField
						label={"firstName"}
						size="small"
						margin="normal"
						fullWidth
						onChange={field.onChange}
						value={field.value}
					/>
				)}
			/>
			<Controller
				control={control}
				name={"password"}
				rules={loginValidation}
				render={({ field }) => (
					<TextField
						label={"password"}
						size="small"
						margin="normal"
						fullWidth
						onChange={field.onChange}
						value={field.value}
						error={!errors.password?.message}
						helperText={errors.password?.message}
					/>
				)}
			/>

			<TextField
				label={"firstName"}
				size="small"
				margin="normal"
				type="password"
				fullWidth
			/>
			<Button
				type={"submit"}
				variant="contained"
				disableElevation
				fullWidth
			></Button>
		</form>
	);
}
