import { useForm } from "react-hook-form";
import { IUser } from "../../../api/interfaces/user/user.interface";
import Form from "../../../components/form/form";
import FormActions from "../../../components/form/form-actions";

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
	console.log(loading, formState.isDirty)
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
			<FormActions
				handleSubmit={handleSubmit}
				onSubmit={onSubmit}
				reset={reset}
				// actions={([submit, reset_a]) => [
				// 	{ ...submit, value: "Сохранить" },
				// 	{
				// 		...reset_a,
				// 		componentProps: {
				// 			onClick: () => reset(defaultValues),
				// 		},
				// 	},
				// ]}
				disabled={loading || !formState.isDirty}
			/>
		</Form>
	);
}
