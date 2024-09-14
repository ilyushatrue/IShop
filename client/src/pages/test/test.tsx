import { useEffect, useMemo } from "react";
import Page from "../../components/page";
import useApi from "../../api/hooks/use-api.hook";
import { TestApi } from "../../api/endpoints/test.api";

export default function Test() {
	const controller = useMemo(() => new AbortController(), []);
	const { signal } = controller;

	const { fetchAsync, isFetching } = useApi();
	useEffect(() => {
		fetchAsync({
			request: TestApi.getAllCategories(signal),
			onError: (error) => error.log("info").popup(),
			triggerPageLoader: true,
		}).catch(Boolean);
	}, [fetchAsync, signal]);

	const handleCancel = () => {
		controller.abort();
	};

	return (
		<Page>
			<button onClick={handleCancel} disabled={!isFetching}>
				Cancel Request
			</button>
		</Page>
	);
}
