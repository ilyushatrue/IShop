import Page from "../../components/page";
import { Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function NoAccess() {
	const navigate = useNavigate();
	return (
		<Page>
			<Box>
				NO ACCESS
				<Button onClick={() => navigate("/auth")}>LOGIN?</Button>
			</Box>
		</Page>
	);
}
