import { Box } from "@mui/material";
import UserForm from "./user-form";
import useApi from "../../../api/hooks/use-api.hook";
import usersApi from "../../../api/users.api";
import { useState } from "react";
import ProfilePage from "../profile-page";
import { updateCurrentUserState } from "../../../store/user.slice";
import { IUser } from "../../../api/interfaces/user/user.interface";
import { useAppSelector } from "../../../app/hooks/redux/use-app-selector";
import { useAppDispatch } from "../../../app/hooks/redux/use-app-dispatch";

export default function Profile() {
	const userState = useAppSelector((state) => state.user);
	const [user, setUser] = useState<IUser>({
		avatarId: userState.avatarId,
		email: userState.email!,
		firstName: userState.firstName!,
		lastName: userState.lastName!,
		phone: userState.phone,
	});
	const dispatch = useAppDispatch();
	const { fetchAsync, isFetching } = useApi({ triggerPage: true });

	async function handleFormSubmitAsync(user: IUser) {
		let updated = false;
		await fetchAsync({
			request: () => usersApi.updateUserData(user),
			onSuccess: (handler) =>
				handler.popup("Данные успешно обновлены!").do(() => {
					updated = true;
				}),
			onError: (handler) => handler.log().popup(),
		});

		if (!updated) return;

		await fetchAsync({
			request: usersApi.getCurrentAsync,
			onSuccess: (handler) =>
				handler.do(({ body }) => {
					const { email, firstName, lastName, avatarId, phone } =
						body!;
					dispatch(
						updateCurrentUserState({
							email: email,
							firstName: firstName,
							lastName: lastName,
							avatarId: avatarId,
							phone: phone,
							isAuthenticated: true,
						})
					);
					setUser(body!);
				}),
			onError: (handler) => handler.log().popup(),
		});
	}

	return (
		<ProfilePage mainBoxProps={{ sx: { padding: 2 } }}>
			<Box
				width={500}
				marginX={"auto"}
				display="flex"
				flexDirection="column"
				alignItems="center"
			>
				<UserForm
					loading={isFetching}
					onSubmitAsync={handleFormSubmitAsync}
					defaultValues={user}
				/>
			</Box>
		</ProfilePage>
	);
}
