import { createApi, fetchBaseQuery, retry } from "@reduxjs/toolkit/query/react";
import getConstant from "../infrastructure/constantProvider";

const baseQuery = fetchBaseQuery({
	baseUrl: getConstant("API_URL"),
	credentials: "include",
});

const baseQueryWithRetry = retry(baseQuery, { maxRetries: 1 });

export const api = createApi({
	reducerPath: "flagsApi",
	baseQuery: baseQueryWithRetry,
	refetchOnMountOrArgChange: true,
	endpoints: () => ({}),
});
