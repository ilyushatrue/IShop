import React from "react";
import {
	Form,
	SubmitHandler,
	UseFormHandleSubmit,
	useForm,
} from "react-hook-form";

type RegisterForm = {
	firstName: string;
	lastName: string;
	phone: string;
	email: string;
	password: string;
	confirmPassword: string;
};

export default function Register2() {
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
		alert("submitted");
	};

	return (
		<form>
			<input
				type="text"
				{...register("firstName", {
					required: "Is reqiered",
				})}
			/>
			{errors.firstName && (
				<div style={{ color: "red" }}>{errors.firstName.message}</div>
			)}
			<button>send</button>
		</form>
	);
}
