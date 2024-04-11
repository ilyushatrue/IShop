import {useEffect, useState } from "react";

export default function Users() {
	const [users, setUsers] = useState<{ name: string }[]>([]);

	useEffect(()=>{
		
	},[])

	return (
		<article>
			<h2>Users list</h2>
			{users?.length ? (
				<ul>
					{users.map((user, index) => (
						<li key={index}>{user?.name}</li>
					))}
				</ul>
			) : (
				<p>no users to display</p>
			)}
		</article>
	);
}
