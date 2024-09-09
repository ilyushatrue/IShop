import { useCallback, useState } from "react";
import { ApiResponse } from "../api";
import { usePopup } from "../../app/hooks/use-popup.hook";
import { useAppDispatch } from "../../app/hooks/redux/use-app-dispatch";
import { setIsPageLoading } from "../../store/page.slice";

type ErrorHandler<T> = {
	log: () => ErrorHandler<T>;
	popup: (message?: string) => ErrorHandler<T>;
	throw: () => void;
};

type SuccessHandler<T> = {
	popup: (message: string) => SuccessHandler<T>;
	validate: (
		predicate: (result: T) => boolean,
		message?: string
	) => SuccessHandler<T>;
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

	const getSuccessHandler = useCallback(
		<TOut>(
			apiResult: ApiResponse<TOut>
		): SuccessHandler<ApiResponse<TOut>> => {
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
			};
			return successHandler;
		},
		[popupSuccess]
	);

	const getErrorHandler = useCallback(
		<TOut>(
			apiResult: ApiResponse<TOut>
		): ErrorHandler<ApiResponse<TOut>> => {
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
				throw: () => {
					const { message, name } = apiResult.errors[0];
					throw new Error(message, { cause: name });
				},
			};
			return errorHandler;
		},
		[popupError]
	);

	const fetchAsync = useCallback(
		async <TOut>({
			request,
			onError,
			onSuccess,
			triggerPageLoader,
		}: Fetch<TOut>): Promise<ApiResponse<TOut> | undefined> => {
			if (triggerPageLoader) dispatch(setIsPageLoading(true));
			setIsFetching(true);
			try {
				const response = await request;
				if (response.ok) {
					if (onSuccess) {
						const successHandler = getSuccessHandler(response);
						onSuccess(successHandler);
					}
				} else {
					if (onError) {
						const errorHandler = getErrorHandler(response);
						onError(errorHandler);
					}
				}
				return response;
			} finally {
				setIsFetching(false);
				if (triggerPageLoader) dispatch(setIsPageLoading(false));
			}
		},
		[dispatch, getErrorHandler, getSuccessHandler]
	);

	return { fetchAsync, isFetching };
}
