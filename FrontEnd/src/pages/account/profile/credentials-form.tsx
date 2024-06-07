import Form from "../../../components/form/form";
import { IUserCredentialsRequest } from "./profile";

export default function CredentialsForm({
	error,
	onSubmitAsync,
	defaultValues,
}: {
	defaultValues: IUserCredentialsRequest;
	error?: string;
	onSubmitAsync: (values: IUserCredentialsRequest) => Promise<void>;
}) {
	return (
		<Form
			defaultValues={defaultValues}
			minHeight={430}
			submitButtonText="Изменить"
			error={error ?? ""}
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
