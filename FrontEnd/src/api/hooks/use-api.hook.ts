import { useState } from 'react'
import getConstant from '../../infrastructure/constantProvider';
import { IApiError } from '../interfaces/api/api-error.interface';
import api, { TTryFetch } from '../api';
import { IErrorOr } from '../interfaces/api/error-or.interface';


export default function useApi() {

	const [isFetching, setIsFetching] = useState(false);
	const [errors, setErrors] = useState<IApiError[]>([])

	async function tryGetAsync<TOut>({ url, onError, onSuccess }: { url: string, onError?: TTryFetch["onError"], onSuccess?: TTryFetch["onSuccess"] }): Promise<IErrorOr<TOut> | undefined> {
		setIsFetching(true)
		const result = await api.tryFetchAsync<TOut>({ request: async () => await getAsync(url), onError, onSuccess });
		setIsFetching(false)
		return result;
	}

	async function getAsync(url: string): Promise<Response> {
		setIsFetching(true)
		const fullUrl = getConstant("API_URL") + url;
		return await fetch(fullUrl, {
			method: "GET",
			credentials: "include",
		}).finally(() => setIsFetching(false))
	}

	async function tryPostAsync<TOut>(url: string,
		data?: any, onError?: TTryFetch["onError"], onSuccess?: TTryFetch["onSuccess"]): Promise<IErrorOr<TOut> | undefined> {
		setIsFetching(true);
		const result = await api.tryFetchAsync<TOut>({ request: async () => await postAsync(url, data), onError, onSuccess });
		setIsFetching(false);
		return result;
	}

	async function postAsync(url: string,
		data?: any): Promise<Response> {
		setIsFetching(true)
		const fullUrl = getConstant("API_URL") + url;
		return await fetch(fullUrl, {
			method: "POST",
			body: data ? JSON.stringify(data) : undefined,
			credentials: "include",
			headers: data
				? {
					"Content-Type": "application/json",
				}
				: undefined,
		}).finally(() => setIsFetching(false))
	}

	return { tryGetAsync, tryPostAsync, isFetching, errors };
}
