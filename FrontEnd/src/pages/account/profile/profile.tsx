import { Box } from "@mui/material";
import Page from "../../../components/page";
import { useAppSelector } from "../../../app/hooks/redux/use-app-selector";
import CredentialsForm from "./credentials-form";
import { usePopup } from "../../../app/hooks/use-popup.hook";
import AvatarPlus from "./avatar-plus";
import IconButton from "../../../components/icon-button";
import useApi from "../../../api/hooks/use-api.hook";
import usersApi from "../../../api/users.api";
import { IUser } from "../../../api/interfaces/user/user.interface";
import { useAppDispatch } from "../../../app/hooks/redux/use-app-dispatch";
import { updateData } from "../../../store/user.slice";

export interface IUserCredentialsRequest {
	firstName: string;
	lastName: string;
	phone: string;
	email: string;
}

export default function Profile() {
	const user = useAppSelector((state) => state.user.user);
	const dispatch = useAppDispatch();
	//const { popupError, popupSuccess } = usePopup();
	const { isFetching, fetchAsync } = useApi();

	// useEffect(() => {
	// 	tryFetchAsync({
	// 		request: ()=>
	// 	})
	// }, []);

	async function handleSubmitAsync(avatarId: string) {
		console.log("avatarId: " + avatarId)
		const newUserData = { ...user };
		newUserData.avatarId = avatarId;
		await fetchAsync({
			request: async () =>
				await usersApi.updateUserData(newUserData as IUser),
			onSuccess: (handler) =>
				handler.do(() => dispatch(updateData(newUserData as IUser))),
		});
	}

	async function handleFormSubmitAsync(avatarId: IUserCredentialsRequest) {

	}

	return (
		<Page>
			<Box
				display={"flex"}
				justifyContent={"center"}
				alignItems={"center"}
			>
				<AvatarPlus
					imageId={user?.avatarId}
					onChange={handleSubmitAsync}
				/>
			</Box>
			<CredentialsForm
				onSubmitAsync={handleFormSubmitAsync}
				defaultValues={user!}
			/>
		</Page>
	);
}
