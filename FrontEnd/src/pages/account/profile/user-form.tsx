import Form from "../../../components/form/form";
import { IUserCredentialsRequest } from "./profile";

export default function UserForm({
	onSubmitAsync,
	defaultValues,
	minHeight =330,
}: {
	defaultValues: IUserCredentialsRequest;
	onSubmitAsync: (values: IUserCredentialsRequest) => Promise<void>;
	minHeight?: number;
}) {
	return (
		<Form
			defaultValues={defaultValues}
			minHeight={minHeight}
			submitButtonText="Сохранить"
			onSubmitAsync={onSubmitAsync}
			fields={(builder) =>
				builder
					.image({
						name:"avatarId",
						shape:"circled"
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
					})
			}
		/>
	);
}
