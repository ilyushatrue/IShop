import { useEffect } from "react";
import { Button } from "@mui/material";
import Page from "../../../components/page";
import useApi from "../../../api/hooks/use-api.hook";
import { useAppSelector } from "../../../app/hooks/redux/use-app-selector";
import CredentialsForm from "./credentials-form";
import { usePopup } from "../../../app/hooks/use-popup.hook";

export interface IUserCredentialsRequest {
	firstName: string;
	lastName: string;
	phone: string;
	email: string;
}

export default function Profile() {
	const { popupError, popupSuccess } = usePopup();
	const user = useAppSelector((state) => state.user.user);
	//const { isFetching, tryFetchAsync } = useApi();

	// useEffect(() => {
	// 	tryFetchAsync({
	// 		request: ()=>
	// 	})
	// }, []);

	async function handleSubmitAsync(values: IUserCredentialsRequest) {}

	return (
		<Page>
			<CredentialsForm
				onSubmitAsync={handleSubmitAsync}
				defaultValues={user!}
			/>

			<Button onClick={() => popupError("This is an error!")}>
				Show Error
			</Button>
			<Button onClick={() => popupSuccess("This is a success!")}>
				Show Success
			</Button>
		</Page>
	);
}
