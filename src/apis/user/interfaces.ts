interface IRole {
    id: string;
    name: string;
}

export interface IUser {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    status: IUserStatus;
    createdAt: string;
    invitedAt: Date | null;
    role: IRole;
}

export type IUserStatus = 'active' | 'invited' | 'pending' | 'banned';
export interface IUserQueryParams {
    status: IUserStatus
}


export interface IUserInvite {
    email: string;
    firstName: string;
    lastName: string;
    roleId: string;
}

export interface IUserConfirmPending {
    roleId: string;
}