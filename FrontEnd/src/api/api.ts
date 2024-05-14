import { createApi, fetchBaseQuery, retry } from "@reduxjs/toolkit/query/react";
import getConstant from "../infrastructure/constantProvider";

const baseQuery = fetchBaseQuery({
	baseUrl: getConstant("API_URL")
})

const baseQueryWithRetry = retry(baseQuery, { maxRetries: 1 })

export const api = createApi({
	reducerPath: 'splitApi',
	baseQuery: baseQueryWithRetry,
	refetchOnMountOrArgChange: true,
	endpoints: ()=>({})
})