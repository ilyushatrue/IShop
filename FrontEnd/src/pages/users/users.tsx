import React, { useEffect, useState } from "react";
import api from "../../infrastructure/apiAccessor";
import { IUser } from "../../api/interfaces/user/IUsers";

export default function Users() {
	const [users, setUsers] = useState<IUser[]>([]);
	useEffect(() => {
		loadData();
	}, []);

	async function loadData() {
		try {
			const response = await api.getAsync("users");
			if (!!response.length) setUsers(response);
            console.log(response)
		} catch (error) {
			console.error(error);
		}
	}

	return (
		<div>
			{users.map((user, index) => (
				<div key={index}>{user.firstName + " " + user.lastName + " " + user.email + " " + user.phone}</div>
			))}
		</div>
	);
}
