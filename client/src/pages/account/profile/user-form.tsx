import { SubmitHandler, useForm } from "react-hook-form";
import { IUser } from "../../../api/interfaces/user/user.interface";
import Form from "../../../components/form/form";
import FormActions from "../../../components/form/form-actions";
import OutlinedButton from "../../../components/buttons/outlined-button";
import Button from "../../../components/buttons/button";

export default function UserForm({
	onSubmit,
	defaultValues,
	loading,
}: {
	defaultValues: IUser;
	onSubmit: (values: IUser) => void;
	loading: boolean;
}) {
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
					})
					.text({
						name: "firstName",
						label: "Имя",
						required: true,
					})
					.text({
						name: "lastName",
						label: "Фамилия",
					})
					.phone({
						name: "phone",
					})
					.email({
						name: "email",
						required: true,
						disabled: true,
					})
			}
		>
			<FormActions>
				<OutlinedButton
					onClick={() => reset()}
					disabled={loading || !formState.isDirty}
				>
					Отмена
				</OutlinedButton>
				<Button
					onClick={handleSubmit(handleSubmitButtonClick)}
					autoFocus
					disabled={loading || !formState.isDirty}
				>
					Добавить
				</Button>
			</FormActions>
		</Form>
	);
}
