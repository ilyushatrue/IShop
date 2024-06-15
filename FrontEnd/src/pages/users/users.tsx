import { useEffect, useState } from "react";
import { IUser } from "../../api/interfaces/user/user.interface";
import Page, { IPage } from "../../components/page";
import useApi from "../../api/hooks/use-api.hook";
import { Box } from "@mui/material";
import usersApi from "../../api/users.api";
export default function Users({ tabName }: IPage) {
	const [users, setUsers] = useState<any[]>([]);

	const { isFetching, fetchAsync } = useApi();
	useEffect(() => {
		fetchAsync<IUser[]>({
			request: usersApi.getListAsync,
			onSuccess: (handler) =>
				handler.do((result) => setUsers(result.body!.value!)),
			onError: (handler) => handler.log().popup(),
		});
	}, []);

	return (
		<Page tabName={tabName}>
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
								user.email.value +
								" " +
								user.phone.value}
						</div>
					))}
				</>
			)}
		</Page>
	);
}
