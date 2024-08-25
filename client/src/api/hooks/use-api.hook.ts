import { useEffect, useState } from "react";
import { ApiResponse } from "../api";
import { usePopup } from "../../app/hooks/use-popup.hook";
import { useAppDispatch } from "../../app/hooks/redux/use-app-dispatch";
import { setIsPageLoading } from "../../store/page.slice";

type ErrorHandler<T> = {
	log: () => ErrorHandler<T>;
	popup: (message?: string) => ErrorHandler<T>;
	do: (
		action: (error: { message: string; name: string }) => void
	) => ErrorHandler<T>;
};

type SuccessHandler<T> = {
	popup: (message: string) => SuccessHandler<T>;
	validate: (
		predicate: (result: T) => boolean,
		message?: string
	) => SuccessHandler<T>;
	do: (action: (result: T) => void) => SuccessHandler<T>;
};

type Fetch<TOut> = {
	request: Promise<ApiResponse<TOut>>;
	onSuccess?: (handler: SuccessHandler<ApiResponse<TOut>>) => void;
	onError?: (handler: ErrorHandler<ApiResponse<TOut>>) => void;
	triggerPageLoader?: boolean;
};

export default function useApi() {
	const dispatch = useAppDispatch();
	const [isFetching, setIsFetching] = useState(false);
	const { popupError, popupSuccess } = usePopup();

	const fetchAsync = async <TOut>({
		request,
		onError,
		onSuccess,
		triggerPageLoader,
	}: Fetch<TOut>): Promise<void> => {
		if (triggerPageLoader) dispatch(setIsPageLoading(true));
		setIsFetching(true);
		const requestFunc = async () => await request;
		const response = await requestFunc();
		if (response.ok) {
			const successHandler = getSuccessHandler(response);
			onSuccess?.(successHandler);
		} else {
			const errorHandler = getErrorHandler(response);
			onError?.(errorHandler);
		}
		setIsFetching(false);
		if (triggerPageLoader) dispatch(setIsPageLoading(false));
	};

	function getSuccessHandler<TOut>(
		apiResult: ApiResponse<TOut>
	): SuccessHandler<ApiResponse<TOut>> {
		const successHandler: SuccessHandler<ApiResponse<TOut>> = {
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
	): ErrorHandler<ApiResponse<TOut>> {
		const errorHandler: ErrorHandler<ApiResponse<TOut>> = {
			log: () => {
				console.error(apiResult);
				return errorHandler;
			},
			popup: (message) => {
				const apiMessage = apiResult.errors[0].message;
				popupError(
					apiMessage
						? apiMessage
						: message
						? message
						: "Что-то пошло не так. Обратитесь к администратору."
				);
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
