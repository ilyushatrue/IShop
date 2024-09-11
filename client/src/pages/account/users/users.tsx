import { useEffect, useState } from "react";
import { IUser } from "../../../api/interfaces/user/user.interface";
import useApi from "../../../api/hooks/use-api.hook";
import usersApi from "../../../api/endpoints/users.api";
import { useNavigate } from "react-router-dom";
import AccountProtectedPage from "../account-protected-page";
import AccountPageSideBox from "../account-page-side-box";
import AccountPageMainBox from "../account-page-main-box";
import AccountPageMainBoxHeader from "../account-page-main-box-header";
export default function Users() {
	const [users, setUsers] = useState<any[]>([]);
	const navigate = useNavigate();

	const { fetchAsync } = useApi();
	useEffect(() => {
		fetchAsync<IUser[]>({
			request: usersApi.getListAsync(),
			onError: (handler) => handler.log().popup().throw(),
			triggerPageLoader: true,
		})
			.catch(() => navigate("/"))
			.then((result) => setUsers(result!.body!));
	}, [fetchAsync, navigate]);

	return (
		<AccountProtectedPage title="Пользователи">
			<AccountPageSideBox />
			<AccountPageMainBox>
				<AccountPageMainBoxHeader>Пользователи</AccountPageMainBoxHeader>
				{users.map((user, index) => (
					<div
						key={index}
						style={{ backgroundColor: "palevioletred" }}
					>
						{user.firstName +
							" " +
							user.lastName +
							" " +
							user.email.value +
							" " +
							user.phone?.value}
					</div>
				))}
			</AccountPageMainBox>
		</AccountProtectedPage>
	);
}
