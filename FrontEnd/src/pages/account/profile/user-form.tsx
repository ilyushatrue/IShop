import Form from "../../../components/form/form";
import { IUserCredentialsRequest } from "./profile";

export default function UserForm({
	onSubmitAsync,
	defaultValues,
	minHeight = 330,
	loading,
}: {
	defaultValues: IUserCredentialsRequest;
	onSubmitAsync: (values: IUserCredentialsRequest) => Promise<void>;
	loading: boolean;
	minHeight?: number;
}) {
	return (
		<Form
			defaultValues={defaultValues}
			minHeight={minHeight}
			actions={([submit, reset]) => [
				{ ...submit, label: "Сохранить" },
				reset,
			]}
			onSubmit={onSubmitAsync}
			loading={loading}
			fields={(builder) =>
				builder
					.image({
						name: "avatarId",
						shape: "circled",
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
					.email({
						name: "email",
						required: true,
						enabled: false,
					})
			}
		/>
	);
}
