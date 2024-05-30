import { IUser } from "../api/interfaces/user/user.interface";

export interface IUserState { user: IUser | null, isAuthenticated: boolean, isLoading: boolean, error: string }