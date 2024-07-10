import { useState } from "react";
import { ApiResponse } from "../api";
import { usePopup } from "../../app/hooks/use-popup.hook";

type TApiErrorHandler<T> = {
	log: () => TApiErrorHandler<T>;
	popup: (message?: string) => TApiErrorHandler<T>;
	do: (action: (error: { message: string, name: string }) => void) => TApiErrorHandler<T>;
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
	request: () => Promise<ApiResponse<TOut>>;
	onSuccess?: (handler: TApiSuccessHandler<ApiResponse<TOut>>) => void;
	onError?: (handler: TApiErrorHandler<ApiResponse<TOut>>) => void;
};

export default function useApi() {
	const [isFetching, setIsFetching] = useState(false);
	const { popupError, popupSuccess } = usePopup();

	const fetchAsync = async <TOut>({
		request,
		onError,
		onSuccess,
	}: TTryFetch<TOut>): Promise<void> => {
		setIsFetching(true);
		const response = await request();
		if (response.ok) {
			const successHandler = getSuccessHandler(response);
			onSuccess?.(successHandler);
		} else {
			const errorHandler = getErrorHandler(response);
			onError?.(errorHandler);
		}
		setIsFetching(false);
	};

	function getSuccessHandler<TOut>(
		apiResult: ApiResponse<TOut>
	): TApiSuccessHandler<ApiResponse<TOut>> {
		const successHandler: TApiSuccessHandler<ApiResponse<TOut>> = {
			popup: (message) => {
				popupSuccess(message);
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

	function getErrorHandler<TOut>(
		apiResult: ApiResponse<TOut>
	): TApiErrorHandler<ApiResponse<TOut>> {
		const errorHandler: TApiErrorHandler<ApiResponse<TOut>> = {
			log: () => {
				console.error(apiResult);
				return errorHandler;
			},
			popup: (message) => {
				popupError(apiResult.errors[0].message ?? message);
				return errorHandler;
			},
			do: (action) => {
				action(apiResult.errors[0]);
				return errorHandler;
			},
		};
		return errorHandler;
	}

	return { fetchAsync, isFetching };
}
