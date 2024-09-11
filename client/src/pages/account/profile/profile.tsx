import UserForm from "./user-form";
import { useAppSelector } from "../../../app/hooks/redux/use-app-selector";
import AccountProtectedPage from "../account-protected-page";
import { useMediaQueryContext } from "../../../app/infrastructure/media-query-context";
import AccountPageSideBox from "../account-page-side-box";
import AccountPageMainBox from "../account-page-main-box";
import AccountPageMainBoxHeader from "../account-page-main-box-header";

export default function Profile() {
	const userState = useAppSelector((state) => state.user);
	const { xs } = useMediaQueryContext();

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
