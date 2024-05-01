import { IUser } from "../api/interfaces/user/IUser";

export interface IUserState { user: IUser | null, isAuthenticated: boolean }