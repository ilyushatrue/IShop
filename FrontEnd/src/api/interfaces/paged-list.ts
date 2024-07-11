export interface IPager<T> {
	totalPages: number
	currentPage: number
	pageSize: number
	pageItems: T[]
}