import { useEffect, useState } from "react";
import { IUser } from "../../../api/interfaces/user/user.interface";
import Page, { IPage } from "../../../components/page";
import useApi from "../../../api/hooks/use-api.hook";
import { Box } from "@mui/material";
import usersApi from "../../../api/users.api";
import { useNavigate } from "react-router-dom";
import ProfilePage from "../profile-page";
export default function Users({ tabName }: IPage) {
	const [users, setUsers] = useState<any[]>([]);
	const navigate = useNavigate()

	const { isFetching, fetchAsync } = useApi();
	useEffect(() => {
		fetchAsync<IUser[]>({
			request: usersApi.getListAsync,
			onSuccess: (handler) =>
				handler.do((result) => setUsers(result.body!)),
			onError: (handler) => handler.log().popup().do(()=> navigate("/")),
		});
	}, []);

	return (
		<ProfilePage isLoading={isFetching} >
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
		</ProfilePage>
	);
}
