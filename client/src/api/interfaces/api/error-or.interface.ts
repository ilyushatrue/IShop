import { IApiError } from "./api-error.interface"


export interface IErrorOr<T> {
	errors: IApiError[]
	errorsOrEmptyList: any[]
	firstError: IApiError
	isError: boolean,
	value: T | null
}