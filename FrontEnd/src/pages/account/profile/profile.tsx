import { Box } from "@mui/material";
import Page from "../../../components/page";
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
import IconButton from "../../../components/icon-button";
import { useNavigate } from "react-router-dom";
import ProfilePage from "../../profile-page";

export interface IUserCredentialsRequest {
	firstName: string;
	lastName: string;
	phone: string;
	email: string;
}

export default function Profile() {
	const navbarHeight = useAppSelector((state) => state.page.navbar.height);
	const displayWidth = useAppSelector((state) => state.page.displayWidth);
	const navigate = useNavigate();
	const [user, setUser] = useState(
		useAppSelector((state) => state.user.user)
	);
	const dispatch = useAppDispatch();
	const { isFetching, fetchAsync } = useApi();

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

	async function handleFormSubmitAsync(avatarId: IUserCredentialsRequest) {}

	return (
		<ProfilePage>
			<Box
				width={400}
				display={"flex"}
				flexDirection={"column"}
				alignItems={"center"}
			>
				<AvatarPlus
					imageId={user?.avatarId}
					onChange={handleSubmitAsync}
				/>
				<UserForm
					onSubmitAsync={handleFormSubmitAsync}
					defaultValues={user!}
				/>
			</Box>
		</ProfilePage>
	);
}
