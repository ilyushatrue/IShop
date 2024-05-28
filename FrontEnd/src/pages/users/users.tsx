import { useEffect, useState } from "react";
import api from "../../api/apiAccessor";
import { IUser } from "../../api/interfaces/user/user.interface";
import Page from "../../components/page";
export default function Users() {
	const [users, setUsers] = useState<IUser[]>([]);
	useEffect(() => {
		api.tryGetAsync<IUser[]>("/users").then((response) => {
			if (response !== undefined && response.length > 0)
				setUsers(response);
			console.log(response);
		});
	}, []);


	return (
		<Page>
			{users.map((user, index) => (
				<div key={index} style={{ backgroundColor: "palevioletred" }}>
					{user.firstName +
						" " +
						user.lastName +
						" " +
						user.email +
						" " +
						user.phone}
				</div>
			))}
		</Page>
	);
}
