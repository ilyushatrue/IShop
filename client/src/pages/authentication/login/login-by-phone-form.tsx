import { SubmitHandler, useForm } from "react-hook-form";
import { ILoginByPhoneRequest } from "../../../api/contracts/authentication/login-by-phone-request.interface";
import Form from "../../../components/form/form";
import Button from "../../../components/buttons/button";
import { Box } from "@mui/material";

interface IProps {
	onSubmit: (values: ILoginByPhoneRequest) => void;
	loading: boolean;
}
export default function LoginByPhoneForm({ onSubmit, loading }: IProps) {
	const defaultValues = {
		password: "",
		phone: "7",
	};
	const { handleSubmit, control, watch } = useForm<ILoginByPhoneRequest>({
		mode: "onBlur",
		reValidateMode: "onBlur",
		defaultValues,
	});

	const handleSubmitButtonClick: SubmitHandler<ILoginByPhoneRequest> = (
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
				builder
					.phone({
						name: "phone",
					})
					.password({
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
