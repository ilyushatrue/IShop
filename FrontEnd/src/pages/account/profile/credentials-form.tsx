import Form from "../../../components/form/form";
import { IUserCredentialsRequest } from "./profile";

export default function CredentialsForm({
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
			submitButtonText="Изменить"
			onSubmitAsync={onSubmitAsync}
			fields={(builder) =>
				builder
					.text({
						name: "firstName",
						label: "Имя",
						size: "small",
						required: true,
					})!
					.text({
						name: "lastName",
						label: "Фамилия",
						size: "small",
					})!
					.phone({
						name: "phone",
						size: "small",
						required: true,
					})!
					.email({
						name: "email",
						size: "small",
						required: true,
					})!
			}
		/>
	);
}
