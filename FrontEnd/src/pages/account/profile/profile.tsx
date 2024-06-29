import { Box } from "@mui/material";
import { useAppSelector } from "../../../app/hooks/redux/use-app-selector";
import UserForm from "./user-form";
import useApi from "../../../api/hooks/use-api.hook";
import usersApi from "../../../api/users.api";
import { useAppDispatch } from "../../../app/hooks/redux/use-app-dispatch";
import { useState } from "react";
import ProfilePage from "../../profile-page";
import { updateUserData } from "../../../store/user.slice";

export interface IUserCredentialsRequest {
	firstName: string;
	lastName: string;
	phone: string;
	email: string;
	avatarId?: string | null;
}

export default function Profile() {
	const [user, setUser] = useState(
		useAppSelector((state) => state.user.user)
	);
	const dispatch = useAppDispatch();
	const { fetchAsync } = useApi();

	async function handleFormSubmitAsync(user: IUserCredentialsRequest) {
		let updated: boolean = false;
		await fetchAsync({
			request: async () => await usersApi.updateUserData(user),
			onSuccess: (handler) =>
				handler
					.popup("Данные успешно обновлены. Ураааааааааааааа!")
					.do(async () => (updated = true)),
			onError: (handler) => handler.log().popup(),
		});

		if (!updated) return;
		await fetchAsync({
			request: usersApi.getCurrentAsync,
			onSuccess: (handler) =>
				handler.do(({ body }) => {
					dispatch(
						updateUserData({ isAuthenticated: true, user: body! })
					);
					setUser(body!);
				}),
			onError: (handler) => handler.log().popup(),
		});
	}

	return (
		<ProfilePage>
			<Box
				width={400}
				display={"flex"}
				flexDirection={"column"}
				alignItems={"center"}
			>
				<UserForm
					onSubmitAsync={handleFormSubmitAsync}
					defaultValues={user!}
				/>
			</Box>
		</ProfilePage>
	);
}
