import { IUser } from "../user/interfaces";

export interface IUserLogin {
    email: string;
    password: string;
}


export interface IUserSignUp {
    email: string;
    password: string;
    confirmPassword: string;
    firstName: string;
    lastName: string;
}


export interface IUserLoginResponse {
    token: string;
    userInfo: IUser;
}