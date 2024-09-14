import { useEffect } from "react";
import Page from "../../components/page";
import useApi from "../../api/hooks/use-api.hook";
import { TestApi } from "../../api/endpoints/test.api";

export default function Test() {
	const {fetchAsync} = useApi()
	useEffect(()=>{
		fetchAsync({
			request: TestApi.getAllCategories()
		})

	},[fetchAsync])
	return <Page>Test</Page>;
}
