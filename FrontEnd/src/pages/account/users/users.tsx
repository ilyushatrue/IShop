import { useEffect, useState } from "react";
import { IUser } from "../../../api/interfaces/user/user.interface";
import useApi from "../../../api/hooks/use-api.hook";
import usersApi from "../../../api/endpoints/users.api";
import { useNavigate } from "react-router-dom";
import ProfilePage from "../profile-page";
import ProfileProtectedPage from "../profile-protected-page";
export default function Users() {
	const [users, setUsers] = useState<any[]>([]);
	const navigate = useNavigate();

	const { fetchAsync } = useApi({ triggerPage: true });
	useEffect(() => {
		fetchAsync<IUser[]>({
			request: usersApi.getListAsync,
			onSuccess: (handler) =>
				handler.do((result) => setUsers(result.body!)),
			onError: (handler) =>
				handler
					.log()
					.popup()
					.do(() => navigate("/")),
		});
	}, []);

	return (
		<ProfileProtectedPage title="Пользователи">
			<>
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
							user.phone.value}
					</div>
				))}
			</>
		</ProfileProtectedPage>
	);
}
