import { Box, Button } from "@mui/material";
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

export interface IUserCredentialsRequest {
	firstName: string;
	lastName: string;
	phone: string;
	email: string;
}

export default function Profile() {
	const navbarHeight = useAppSelector((state) => state.page.navbar.height);
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
		<Page isLoading={isFetching} sx={{ maxWidth: "100vw" }}>
			<Box display={"flex"} height={`calc(100vh - ${navbarHeight}px)`} >
				<Box
					display={"flex"}
					flexDirection={"column"}
					width={200}
					height={"100%"}
					bgcolor={"#dedede"}
					top={0}
					left={0}
				>
					<Button>Мой профиль</Button>
					<Button>Покупки</Button>
					<Button>Корзина</Button>
					<Button>Реквизиты</Button>
				</Box>
				<Box display={"flex"} flex={1} justifyContent={"center"}  paddingTop={5} overflow={"scroll"} >
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
				</Box>
			</Box>
		</Page>
	);
}
