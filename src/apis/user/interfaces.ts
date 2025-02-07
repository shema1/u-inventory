export interface IUser {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    status: IUserStatus;
    createdAt: string;
    invitedAt: Date | null;
  }

export type IUserStatus = 'active' | 'invited' | 'pending' | 'banned';
export interface IUserQueryParams {
    status: IUserStatus
}