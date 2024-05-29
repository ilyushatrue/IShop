import { useState } from 'react'
import getConstant from '../../infrastructure/constantProvider';
import { IErrorOr } from '../interfaces/api/error-or.interface';
import { IApiError } from '../interfaces/api/api-error.interface';

type TryFetchType = {
	request: () => Promise<Response>;
	onError?: { message?: string; func?: () => void };
	onSuccess?: { message?: string; func?: () => void };
};

export default function useApi() {

	const [isFetching, setIsFetching] = useState(false);
	const [errors, setErrors] = useState<IApiError[]>([])

	async function tryFetchAsync<T>({
		request,
		onError,
		onSuccess
	}: TryFetchType): Promise<T | undefined> {
		setIsFetching(true)
		const attemptsCount = 2;
		try {
			for (let attempt = 1; attempt <= attemptsCount; attempt++) {
				const response = await request();
				if (response.ok) {
					const result = (await response.json()) as IErrorOr<T>;
					if (result.isError) {
						setErrors(result.errors)
						return undefined
					}
					else {
						return result.value ?? undefined;
					}
				} else {
					switch (response.status) {
						case 401:
							if (attempt === 1) {
								await postAsync("/auth/refresh-jwt");
								break;
							}
							else {
								//redirect("/auth");
								return;
							}
						default:
							console.error("Error");
							return undefined;
					}
				}
			}
		}
		catch (error: any) {
			console.error(error ?? onError?.message ?? "")
			onError?.func?.()
		}
		finally {
			setIsFetching(false)
		}
	}

	async function tryGetAsync<TOut>(url: string, onError?: TryFetchType["onError"], onSuccess?: TryFetchType["onSuccess"]): Promise<TOut | undefined> {
		return await tryFetchAsync<TOut>({ request: async () => await getAsync(url), onError, onSuccess });
	}

	async function getAsync(url: string): Promise<Response> {
		setIsFetching(true)
		const fullUrl = getConstant("API_URL") + url;
		return await fetch(fullUrl, {
			method: "GET",
			credentials: "include",
		})
	}

	async function tryPostAsync<TOut>(url: string,
		data?: any, onError?: TryFetchType["onError"], onSuccess?: TryFetchType["onSuccess"]): Promise<TOut | undefined> {
		return await tryFetchAsync<TOut>({ request: async () => await postAsync(url, data), onError, onSuccess });
	}

	async function postAsync(url: string,
		data?: any): Promise<Response> {
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
		})
	}

	return { tryGetAsync, tryPostAsync, isFetching, errors };
}
