import { useCallback, useState } from "react";
import { usePopup } from "../../app/hooks/use-popup.hook";
import { useAppDispatch } from "../../app/hooks/redux/use-app-dispatch";
import { setIsPageLoading } from "../../store/page.slice";
import { ApiResponse } from "../base-api";
import { StatusCodes } from "../enums/status-codes.enum";

type ErrorHandler<T> = {
	log: (level?: "info" | "warn" | "error") => ErrorHandler<T>;
	popup: (message?: string) => ErrorHandler<T>;
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

export default function useApi(
	props: { loading?: boolean } = { loading: false }
) {
	const { loading } = props;
	const [isFetching, setIsFetching] = useState(loading!);
	const dispatch = useAppDispatch();
	const { popupError, popupSuccess } = usePopup();

	const setPageLoading = useCallback(
		(loading: boolean) => dispatch(setIsPageLoading(loading)),
		[dispatch]
	);

	const _getSuccessHandler = <TOut>(
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
	};

	const _getErrorHandler = <TOut>(
		error: Error
	): ErrorHandler<ApiResponse<TOut>> => {
		const errorHandler: ErrorHandler<ApiResponse<TOut>> = {
			log: (level) => {
				let message = error.message;
				if (error.name === "AbortError") {
					message = "Запрос был отменен пользователем.";
				}
				switch (level) {
					case "error":
						console.error(message ?? "", error);
						break;
					case "warn":
						console.warn(message ?? "", error);
						break;
					case "info":
						console.info(message ?? "", error);
						break;
					default:
						console.error(message ?? "", error);
				}

				return errorHandler;
			},
			popup: (message) => {
				if (error.name === "AbortError") {
					return errorHandler;
				}
				const defaultMessage =
					"Что-то пошло не так. Обратитесь к администратору.";
				const popupMessage = error.message ?? message ?? defaultMessage;
				if (popupMessage) {
					popupError(popupMessage);
				}
				return errorHandler;
			},
		};
		return errorHandler;
	};

	const _fetchAsync = async <TOut>({
		request,
		onError,
		onSuccess,
		triggerPageLoader,
	}: Fetch<TOut>): Promise<ApiResponse<TOut>> => {
		if (triggerPageLoader) setPageLoading(true);
		setIsFetching(true);
		let response: ApiResponse<TOut> = null!;
		try {
			response = await request;
			if (response.ok) {
				if (onSuccess) {
					const successHandler = getSuccessHandler(response);
					onSuccess(successHandler);
				}
			} else {
				if (response.errors.length) {
					const firstError = response.errors?.[0];
					throw new Error(firstError?.message ?? "", {
						cause: firstError?.name ?? response.status,
					});
				}
				if (response.status === StatusCodes.UNAUTHORIZED) {
					throw new Error("Пользователь не аутентифицирован.", {
						cause: StatusCodes.UNAUTHORIZED,
					});
				}
			}
			return response;
		} catch (error: any) {
			if (onError) {
				const errorHandler = getErrorHandler(error);
				onError(errorHandler);
			}
			throw error;
		} finally {
			setIsFetching(false);
			if (triggerPageLoader) setPageLoading(false);
		}
	};

	const getSuccessHandler = useCallback(_getSuccessHandler, [popupSuccess]);
	const getErrorHandler = useCallback(_getErrorHandler, [popupError]);
	const fetchAsync = useCallback(_fetchAsync, [
		getErrorHandler,
		getSuccessHandler,
		setPageLoading,
	]);

	return { fetchAsync, isFetching };
}
