import { Box } from "@mui/material";
import UserForm from "./user-form";
import useApi from "../../../api/hooks/use-api.hook";
import usersApi from "../../../api/endpoints/users.api";
import ProfilePage from "../profile-page";
import { IUser } from "../../../api/interfaces/user/user.interface";
import { useAppSelector } from "../../../app/hooks/redux/use-app-selector";
import { reload } from "../../../app/helpers/reload";

export default function Profile() {
	const userState = useAppSelector((state) => state.user);
	const { fetchAsync, isFetching } = useApi({ triggerPage: true });

	async function handleFormSubmitAsync(user: IUser) {
		await fetchAsync({
			request: () => usersApi.updateUserData(user),
			onSuccess: (handler) =>
				handler.popup("Данные успешно обновлены!").do(reload),
			onError: (handler) => handler.log().popup(),
		});
	}

	return (
		<ProfilePage title="Мой профиль">
			<Box
				width={500}
				marginX={"auto"}
				display="flex"
				flexDirection="column"
				sx={{ padding: 2 }}
				alignItems="center"
			>
				<UserForm
					loading={isFetching}
					onSubmitAsync={handleFormSubmitAsync}
					defaultValues={{
						avatarId: userState.avatarId,
						email: userState.email!,
						firstName: userState.firstName!,
						lastName: userState.lastName!,
						phone: userState.phone ?? "",
					}}
				/>
			</Box>
		</ProfilePage>
	);
}
