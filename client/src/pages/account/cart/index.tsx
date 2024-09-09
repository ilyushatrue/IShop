import AccountPage from "../account-page";
import AccountPageMainBox from "../account-page-main-box";
import AccountPageMainBoxHeader from "../account-page-main-box-header";
import AccountPageSideBox from "../account-page-side-box";

export default function Cart() {
	return (
		<AccountPage>
			<AccountPageSideBox />
			<AccountPageMainBox>
				<AccountPageMainBoxHeader>Корзина</AccountPageMainBoxHeader>
				<div>Cart</div>
			</AccountPageMainBox>
		</AccountPage>
	);
}
