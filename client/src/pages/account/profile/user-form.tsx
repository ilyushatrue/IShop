import { SubmitHandler, useForm } from "react-hook-form";
import { IUser } from "../../../api/interfaces/user/user.interface";
import Form from "../../../components/form/form";
import FormActions from "../../../components/form/form-actions";
import OutlinedButton from "../../../components/buttons/outlined-button";
import Button from "../../../components/buttons/button";
import { useMediaQueryContext } from "../../../app/infrastructure/media-query-context";
import { BoxProps } from "@mui/material";

interface IUserForm extends Omit<BoxProps, "onSubmit"> {
	defaultValues: IUser;
	onSubmit: (values: IUser) => void;
	loading: boolean;
}

export default function UserForm({
	onSubmit,
	defaultValues,
	loading,
	...props
}: IUserForm) {
	const { xs } = useMediaQueryContext();
	const { handleSubmit, control, watch, reset, formState } = useForm<IUser>({
		mode: "onChange",
		reValidateMode: "onBlur",
		defaultValues,
	});

	const handleSubmitButtonClick: SubmitHandler<IUser> = (values) => {
		onSubmit(values);
	};

	return (
		<Form
			{...props}
			control={control}
			watch={watch}
			loading={loading}
			fields={(builder) =>
				builder
					.image({
						name: "avatarId",
						shape: "circled",
						label: "Аватар",
						containerSized: true,
						size: xs ? "small" : "medium",
					})
					.text({
						name: "firstName",
						label: "Имя",
						required: true,
						size: xs ? "small" : "medium",
					})
					.text({
						name: "lastName",
						label: "Фамилия",
						size: xs ? "small" : "medium",
					})
					.phone({
						name: "phone",
						size: xs ? "small" : "medium",
					})
					.email({
						name: "email",
						required: true,
						disabled: true,
						size: xs ? "small" : "medium",
					})
			}
		>
			<FormActions
				sx={{ display: "flex", justifyContent: "space-between" }}
			>
				<OutlinedButton
					size="large"
					onClick={() => reset()}
					disabled={loading || !formState.isDirty}
				>
					Отмена
				</OutlinedButton>
				<Button
					size="large"
					onClick={handleSubmit(handleSubmitButtonClick)}
					autoFocus
					disabled={loading || !formState.isDirty}
				>
					Сохранить
				</Button>
			</FormActions>
		</Form>
	);
}
