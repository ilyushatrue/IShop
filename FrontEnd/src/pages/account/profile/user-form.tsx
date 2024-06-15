import Form from "../../../components/form/form";
import { IUserCredentialsRequest } from "./profile";

export default function UserForm({
	onSubmitAsync,
	defaultValues,
}: {
	defaultValues: IUserCredentialsRequest;
	onSubmitAsync: (values: IUserCredentialsRequest) => Promise<void>;
}) {
	return (
		<Form
			defaultValues={defaultValues}
			minHeight={330}
			submitButtonText="Сохранить"
			onSubmitAsync={onSubmitAsync}
			fields={(builder) =>
				builder
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
					})
			}
		/>
	);
}
