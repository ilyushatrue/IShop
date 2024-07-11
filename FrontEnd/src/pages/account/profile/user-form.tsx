import { IUser } from "../../../api/interfaces/user/user.interface";
import Form from "../../../components/form/form";

export default function UserForm({
	onSubmitAsync,
	defaultValues,
	minHeight = 330,
	loading,
}: {
	defaultValues: IUser;
	onSubmitAsync: (values: IUser) => Promise<void>;
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
		/>
	);
}
