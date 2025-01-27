export interface IUser {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
}


export type IUserStatus = 'active' | 'invited' | 'pending' | 'banned';
export interface IUserQueryParams {
    status: IUserStatus
}