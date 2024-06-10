import { Box } from "@mui/material";
import Page from "../../../components/page";
import { useAppSelector } from "../../../app/hooks/redux/use-app-selector";
import CredentialsForm from "./credentials-form";
import { usePopup } from "../../../app/hooks/use-popup.hook";
import AvatarPlus from "./avatar-plus";
import IconButton from "../../../components/icon-button";

export interface IUserCredentialsRequest {
	firstName: string;
	lastName: string;
	phone: string;
	email: string;
}

export default function Profile() {
	const user = useAppSelector((state) => state.user.user);
	//const { popupError, popupSuccess } = usePopup();
	//const { isFetching, tryFetchAsync } = useApi();

	// useEffect(() => {
	// 	tryFetchAsync({
	// 		request: ()=>
	// 	})
	// }, []);

	async function handleSubmitAsync(values: IUserCredentialsRequest) {

	}

	return (
		<Page>
			<Box
				display={"flex"}
				justifyContent={"center"}
				alignItems={"center"}
			>
				<AvatarPlus imageId={user?.avatarId} onChange={console.log} />
			</Box>
			<CredentialsForm
				onSubmitAsync={handleSubmitAsync}
				defaultValues={user!}
			/>
		</Page>
	);
}

