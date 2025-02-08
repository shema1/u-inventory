import { createApi } from "@reduxjs/toolkit/query/react";
import { IUser, IUserInvite, IUserQueryParams } from "./interfaces";
import getBaseQuery from "../baseQuery/baseQuery";
import { getQueryString } from "../../services/getQueryString";
export const user = createApi({
    baseQuery: getBaseQuery,
    reducerPath: "user",
    tagTypes: ["users"],
    endpoints: (builder) => ({
        // Get current user
        getCurrentUser: builder.query<IUser, void>({
            query: () => ({
                url: '/user/me',
                method: 'GET'
            }),
            providesTags: (result) => 
                result ? [{ type: 'users', id: result.id }] : [],
        }),

        // Get all users
        getUsers: builder.query<IUser[], void>({
            query: () => ({
                url: '/user',
                method: 'GET'
            }),
            providesTags: (result) =>
                result
                    ? [
                        ...result.map((user) => ({ type: "users" as const, id: user.id })),
                        { type: "users" as const, id: "LIST" },
                    ]
                    : [{ type: "users" as const, id: "LIST" }],
        }),

        // Get user by ID
        getUserById: builder.query<IUser, string>({
            query: (id) => ({
                url: `/user/${id}`,
                method: 'GET'
            }),
            providesTags: (result) => 
                result ? [{ type: 'users', id: result.id }] : [],
        }),

        // Get users by status
        getUsersByStatus: builder.query<IUser[], IUserQueryParams>({
            query: (queryParams) => {
                const queryString = getQueryString(queryParams)
                return {
                    url: `/user/byStatus?${queryString}`,
                    method: 'GET'
                }
            },
            providesTags: (result) =>
                result
                    ? [
                        ...result.map((user) => ({ type: "users" as const, id: user.id })),
                        { type: "users" as const, id: "LIST" },
                    ]
                    : [{ type: "users" as const, id: "LIST" }],
        }),

        // Create new user
        createUser: builder.mutation<IUser, Partial<IUser>>({
            query: (userData) => ({
                url: "/user",
                method: "POST",
                body: userData,
            }),
            invalidatesTags: [{ type: "users", id: "LIST" }],
        }),

        // Create invite
        createInvite: builder.mutation<IUser, IUserInvite>({
            query: (newInvite) => ({
                url: "/user/invite",
                method: "POST",
                body: newInvite,
            }),
            invalidatesTags: [{ type: "users", id: "LIST" }],
        }),

        // Update user
        updateUser: builder.mutation<IUser, Partial<IUser>>({
            query: ({ id, ...updatedData }) => ({
                url: `/user/${id}`,
                method: "PUT",
                body: updatedData,
            }),
            invalidatesTags: (result, error, { id }) => [
                { type: "users", id },
                { type: "users", id: "LIST" }
            ],
        }),

        // Delete user
        deleteUser: builder.mutation<void, string>({
            query: (id) => ({
                url: `/user/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: (result, error, id) => [
                { type: "users", id },
                { type: "users", id: "LIST" }
            ],
        }),
    })
});

export const {
    useGetCurrentUserQuery,
    useLazyGetCurrentUserQuery,
    useGetUsersQuery,
    useLazyGetUsersQuery,
    useGetUserByIdQuery,
    useLazyGetUserByIdQuery,
    useGetUsersByStatusQuery,
    useLazyGetUsersByStatusQuery,
    useCreateUserMutation,
    useCreateInviteMutation,
    useUpdateUserMutation,
    useDeleteUserMutation
} = user;