import { useForm } from "react-hook-form";
import { IUser } from "../../../api/interfaces/user/user.interface";
import FormActions from "../../../components/form/form-actions";
import OutlinedButton from "../../../components/buttons/outlined-button";
import Button from "../../../components/buttons/button";
import { BoxProps } from "@mui/material";
import Form from "../../../components/form/form";
import InputImage from "../../../components/form/inputs/input-image";
import InputText from "../../../components/form/inputs/input-text";
import { InputPhone } from "../../../components/form/inputs/input-phone";
import InputEmail from "../../../components/form/inputs/input-email";
import useApi from "../../../api/hooks/use-api.hook";
import UsersApi from "../../../api/endpoints/users.api";

interface IUserForm extends Omit<BoxProps, "onSubmit"> {
	defaultValues: IUser;
}

export default function UserForm({ defaultValues, ...props }: IUserForm) {
	const { fetchAsync, isFetching } = useApi();
	const { handleSubmit, control, reset, formState } = useForm<IUser>({
		mode: "onBlur",
		reValidateMode: "onBlur",
		defaultValues,
	});

	async function handleFormSubmitAsync(user: IUser) {
		await fetchAsync({
			request: UsersApi.updateUserData(user),
			onSuccess: (handler) => handler.popup("Данные успешно обновлены!"),
			onError: (handler) => handler.log().popup(),
			triggerPageLoader: true,
		})
			.then(() => {
				reset(user);
			})
			.catch(Boolean);
	}

	return (
		<Form {...props} onEnterKeyDown={handleSubmit(handleFormSubmitAsync)}>
			<InputImage
				control={control}
				name="avatarId"
				label="Аватар"
				shape="circled"
				containerSized
				disabled={isFetching}
			/>
			<InputText
				control={control}
				name="firstName"
				required
				label="Имя"
				disabled={isFetching}
			/>
			<InputText
				control={control}
				name="lastName"
				required
				label="Фамилия"
				disabled={isFetching}
			/>
			<InputPhone control={control} name="phone" disabled={isFetching} />
			<InputEmail control={control} name="email" disabled required />
			<FormActions>
				<OutlinedButton
					size="large"
					onClick={() => reset()}
					disabled={isFetching || !formState.isDirty}
				>
					Отмена
				</OutlinedButton>
				<Button
					size="large"
					onClick={handleSubmit(handleFormSubmitAsync)}
					autoFocus
					disabled={isFetching || !formState.isDirty}
				>
					Сохранить
				</Button>
			</FormActions>
		</Form>
	);
}
