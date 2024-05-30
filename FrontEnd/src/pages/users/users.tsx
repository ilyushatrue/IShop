import { useEffect, useState } from "react";
import { IUser } from "../../api/interfaces/user/user.interface";
import Page from "../../components/page";
import useApi from "../../api/hooks/use-api.hook";
import { Box } from "@mui/material";
export default function Users() {
	const [users, setUsers] = useState<IUser[]>([]);
	const { isFetching, tryGetAsync } = useApi();
	useEffect(() => {
		tryGetAsync<IUser[]>({ url: "/users" }).then((result) => {
			if (result) {
				console.log(result);
				setUsers(result ?? []);
			}
		});
	}, []);

	return (
		<Page>
			{isFetching ? (
				<Box>isFetching</Box>
			) : (
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
								user.email +
								" " +
								user.phone}
						</div>
					))}
				</>
			)}
		</Page>
	);
}
