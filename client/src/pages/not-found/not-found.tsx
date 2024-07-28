import { Link } from "react-router-dom";
import Page from "../../components/page";

export default function NotFound() {
	return (
		<Page>
			This page doesn't exist. Go <Link to={"/page1"}>home</Link>
		</Page>
	);
}
