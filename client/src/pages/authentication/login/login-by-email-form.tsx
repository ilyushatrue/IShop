import { SubmitHandler, useForm } from "react-hook-form";
import { ILoginByEmailRequest } from "../../../api/contracts/authentication/login-by-email-request.interface";
import Form from "../../../components/form/form";
import { Box } from "@mui/material";
import Button from "../../../components/buttons/button";
interface IProps {
	onSubmit: (values: ILoginByEmailRequest) => void;
	loading: boolean;
}
export default function LoginByEmailForm({ onSubmit, loading }: IProps) {
	const { handleSubmit, control, watch } = useForm<ILoginByEmailRequest>({
		mode: "onSubmit",
		reValidateMode: "onBlur",
		defaultValues: {
			password: "",
			email: "",
		},
	});

	const handleSubmitButtonClick: SubmitHandler<ILoginByEmailRequest> = (
		values
	) => {
		onSubmit(values);
	};

	return (
		<Form
			control={control}
			watch={watch}
			loading={loading}
			style={{ marginBottom: 24 }}
			fields={(builder) =>
				builder.email({ name: "email", required: true }).password({
					name: "password",
					validationRequired: false,
				})
			}
		>
			<Box display={"flex"} justifyContent={"center"} marginTop={"16px"}>
				<Button
					onClick={handleSubmit(handleSubmitButtonClick)}
					size="large"
					sx={{ width: 150, height: 50 }}
					disabled={loading}
				>
					Войти
				</Button>
			</Box>
		</Form>
	);
}
