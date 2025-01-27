import { createApi } from "@reduxjs/toolkit/query/react";
import { IUser, IUserQueryParams } from "./interfaces";
import getBaseQuery from "../baseQuery/baseQuery";
import { getQueryString } from "../../services/getQueryString";
import { IUserInvite } from "../inviteUser/interfaces";


export const user = createApi({
    baseQuery: getBaseQuery,
    reducerPath: "user",
    tagTypes: ["users"],
    endpoints: (builder) => ({
        getUsers: builder.query<IUser[], void>({
            query: () => ({
                url: '/user',
                method: 'GET'
            })
        }),
        checkUser: builder.query<IUser, void>({
            query: () => ({
                url: '/user/checkUser',
                method: 'GET'
            })
        }),
        getUsersByStatus: builder.query<IUser[], IUserQueryParams>({
            query: (queryParams) => {
                const queryString = getQueryString(queryParams)
                return {
                    url: `/user/byStatus?${queryString}`,
                    method: 'GET'
                }
            },
            providesTags: (result: IUser[] | undefined) =>
                result
                    ? [
                        ...result.map((user) => ({ type: "users" as const, id: user.id })),
                        { type: "users" as const, id: "LIST" },
                    ]
                    : [{ type: "users" as const, id: "LIST" }],
        }),
        createInvite: builder.mutation<IUser, IUserInvite>({
            query: (newInvite) => ({
                url: "/user/invite",
                method: "POST",
                body: newInvite,
            }),
            invalidatesTags: [{ type: "users", id: "LIST" }],
        }),
        updateUser: builder.mutation<void, Partial<IUser>>({
            query: ({ id, ...updatedData }) => ({
                url: `/user/${id}`,
                method: "PUT",
                body: updatedData,
            }),
            invalidatesTags: (result, error, { id }) => [{ type: "users", id }],
        }),
        deleteUser: builder.mutation({
            query: (id) => ({
                url: `invited-users/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: (result, error, id) => [{ type: "users", id }, { type: "users", id: "LIST" }],
        }),

    })
})

export const {
    useLazyGetUsersQuery,
    useLazyCheckUserQuery,
    useLazyGetUsersByStatusQuery,
    useCreateInviteMutation,
    useUpdateUserMutation,
    useDeleteUserMutation
} = user