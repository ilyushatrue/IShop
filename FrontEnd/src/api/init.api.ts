import { IGlobalState } from "../store/types";
import { httpGet } from "./api";

export const initApi = {
	getInitialData: () =>
		httpGet<IGlobalState>({ url: `/init` }, (response) =>
			response.json()
		),
};
