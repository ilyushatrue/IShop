import AccountPageMainBox from "../account-page-main-box";
import AccountPageMainBoxHeader from "../account-page-main-box-header";
import AccountPageSideBox from "../account-page-side-box";
import AccountProtectedPage from "../account-protected-page";

export default function Purchases() {
	return (
		<AccountProtectedPage>
			<AccountPageSideBox />
			<AccountPageMainBox>
				<AccountPageMainBoxHeader>Покупки</AccountPageMainBoxHeader>
				<div>Purchases</div>
			</AccountPageMainBox>
		</AccountProtectedPage>
	);
}
