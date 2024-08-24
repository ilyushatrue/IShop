import { IUser } from "../../../api/interfaces/user/user.interface";
import Form from "../../../components/form/form";

export default function UserForm({
	onSubmitAsync,
	defaultValues,
	loading,
	fullwidth,
}: {
	defaultValues: IUser;
	onSubmitAsync: (values: IUser) => Promise<void>;
	loading: boolean;
	fullwidth?: boolean;
}) {
	return (
		<Form
			defaultValues={defaultValues}
			actions={([submit, reset]) => [
				{ ...submit, value: "Сохранить" },
				reset,
			]}
			onSubmit={onSubmitAsync}
			loading={loading}
			fullwidth={fullwidth}
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
