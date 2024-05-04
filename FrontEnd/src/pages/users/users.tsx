import { useEffect, useState } from "react";
import api from "../../api/apiAccessor";
import { IUser } from "../../api/interfaces/user/IUser";
export default function Users() {
	const [users, setUsers] = useState<IUser[]>([]);
	useEffect(() => {
		loadData();
	}, []);

	async function loadData() {
		try {
			const response = await api.getAsync<IUser[]>("users");
			if (response !== undefined && response.length) setUsers(response);
			console.log(response);
		} catch (error: any) {
			const { cause } = error;
			console.log(cause);
			if (cause === 401) {
				return;
			}
		}
	}

	return (
		<div>
			{users.map((user, index) => (
				<div key={index}>
					{user.firstName +
						" " +
						user.lastName +
						" " +
						user.email +
						" " +
						user.phone}
				</div>
			))}
		</div>
	);
}
