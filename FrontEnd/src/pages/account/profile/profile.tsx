import { Box } from "@mui/material";
import { useAppSelector } from "../../../app/hooks/redux/use-app-selector";
import UserForm from "./user-form";
import AvatarPlus from "./avatar-plus";
import useApi from "../../../api/hooks/use-api.hook";
import usersApi from "../../../api/users.api";
import { IUser } from "../../../api/interfaces/user/user.interface";
import { useAppDispatch } from "../../../app/hooks/redux/use-app-dispatch";
import { getCurrentAsync } from "../../../store/user.slice";
import { ApiResponse } from "../../../api/api";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProfilePage from "../../profile-page";

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

	async function handleSubmitAsync(avatarId: string) {
		console.log("avatarId: " + avatarId);
		const newUserData = { ...user };
		newUserData.avatarId = avatarId;
		await fetchAsync({
			request: async () =>
				await usersApi.updateUserData(newUserData as IUser),
			onSuccess: (handler) =>
				handler.popup("Данные успешно обновлены").do(async () => {
					const refreshResult = await dispatch(getCurrentAsync());
					const payload =
						refreshResult.payload as ApiResponse<IUser | null>;
					setUser(payload.body!.value!);
				}),
			onError: (handler) => handler.log().popup(),
		});
	}

	async function handleFormSubmitAsync(user: IUserCredentialsRequest) {
		await fetchAsync({
			request: async () => await usersApi.updateUserData(user),
			onSuccess: (handler) =>
				handler
					.popup("Данные успешно обновлены. Ураааааааааааааа!")
					.do(async () => {
						const refreshResult = await dispatch(getCurrentAsync());
						const payload =
							refreshResult.payload as ApiResponse<IUser | null>;
						setUser(payload.body!.value!);
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
