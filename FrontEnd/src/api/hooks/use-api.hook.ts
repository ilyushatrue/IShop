import { useState } from "react";
import { ApiResponse } from "../api";
import apiAuth from "../auth.api";

type TApiErrorHandler<T> = {
	log: () => TApiErrorHandler<T>;
	popup: (message?: string) => TApiErrorHandler<T>;
	do: (action: (error: any) => void) => TApiErrorHandler<T>;
};

type TApiSuccessHandler<T> = {
	popup: (message: string) => TApiSuccessHandler<T>;
	validate: (
		predicate: (result: T) => boolean,
		message?: string
	) => TApiSuccessHandler<T>;
	do: (action: (result: T) => void) => TApiSuccessHandler<T>;
};

type TTryFetch<TOut> = {
	request: () => Promise<ApiResponse<TOut | undefined>>;
	onSuccess?: (
		handler: TApiSuccessHandler<ApiResponse<TOut | undefined>>
	) => void;
	onError?: (
		handler: TApiErrorHandler<ApiResponse<TOut | undefined>>
	) => void;
};

export default function useApi() {
	const [isFetching, setIsFetching] = useState(false);

	const tryFetchAsync = async <TOut>({
		request,
		onError,
		onSuccess,
	}: TTryFetch<TOut>): Promise<void> => {
		const attemptsCount = 2;
		let errorHandler: TApiErrorHandler<TOut>;
		try {
			setIsFetching(true);
			for (let attempt = 1; attempt <= attemptsCount; attempt++) {
				const response = await request();

				if (response.ok) {
					const successHandler = getSuccessHandler(response);
					onSuccess?.(successHandler);
					break;
				}
				if (response.status === 401 && attempt === 1) {
					const jwtResponse = await apiAuth.refreshJwtAsync();
					if (jwtResponse.ok) continue;
				}

				errorHandler = getErrorHandler(response);
				onError?.(errorHandler);
				break;
			}
		} catch (error) {
			console.warn("Не удалось выполнить запрос: ", error);
		} finally {
			setIsFetching(false);
		}
		errorHandler = getErrorHandler({
			status: 500,
			ok: false,
			body: undefined,
		});
		onError?.(errorHandler);
	};

	function getSuccessHandler<TOut>(
		apiResult: TOut
	): TApiSuccessHandler<TOut> {
		const successHandler: TApiSuccessHandler<TOut> = {
			popup: (message) => {
				//showSuccess(message);
				return successHandler;
			},
			validate: (predicate, message) => {
				if (apiResult !== null && !predicate(apiResult))
					throw new Error(message);
				return successHandler;
			},
			do: (action) => {
				apiResult !== null && action(apiResult);
				return successHandler;
			},
		};
		return successHandler;
	}

	function getErrorHandler<TOut>(apiResult: TOut): TApiErrorHandler<TOut> {
		const errorHandler: TApiErrorHandler<TOut> = {
			log: () => {
				console.error(apiResult);
				return errorHandler;
			},
			popup: (message) => {
				// showError(
				// 	message
				// 		? message
				// 		: error.message
				// 		? error.message
				// 		: lang.error
				// );
				return errorHandler;
			},
			do: (action) => {
				action(apiResult);
				return errorHandler;
			},
		};
		return errorHandler;
	}

	return { tryFetchAsync, isFetching };
}
