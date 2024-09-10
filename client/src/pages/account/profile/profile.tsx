import UserForm from "./user-form";
import useApi from "../../../api/hooks/use-api.hook";
import usersApi from "../../../api/endpoints/users.api";
import { IUser } from "../../../api/interfaces/user/user.interface";
import { useAppSelector } from "../../../app/hooks/redux/use-app-selector";
import { reload } from "../../../app/helpers/reload";
import AccountProtectedPage from "../account-protected-page";
import { useMediaQueryContext } from "../../../app/infrastructure/media-query-context";
import AccountPageSideBox from "../account-page-side-box";
import AccountPageMainBox from "../account-page-main-box";
import AccountPageMainBoxHeader from "../account-page-main-box-header";

export default function Profile() {
	const userState = useAppSelector((state) => state.user);
	const { xs } = useMediaQueryContext();
	const { fetchAsync, isFetching } = useApi();

	async function handleFormSubmitAsync(user: IUser) {
		await fetchAsync({
			request: usersApi.updateUserData(user),
			onSuccess: (handler) => handler.popup("Данные успешно обновлены!"),
			onError: (handler) => handler.log().popup(),
			triggerPageLoader: true,
		}).then(reload);
	}

	return (
		<AccountProtectedPage>
			<AccountPageSideBox />
			<AccountPageMainBox>
				<AccountPageMainBoxHeader>Мой профиль</AccountPageMainBoxHeader>
				<UserForm
					sx={{
						maxWidth: 500,
						padding: xs ? 2 : 0,
						width: xs ? "100%" : 500,
						marginX: "auto",
					}}
					onSubmit={handleFormSubmitAsync}
					loading={isFetching}
					defaultValues={{
						avatarId: userState.avatarId,
						email: userState.email!,
						firstName: userState.firstName!,
						lastName: userState.lastName!,
						phone: userState.phone ?? "",
					}}
				/>
			</AccountPageMainBox>
		</AccountProtectedPage>
	);
}
