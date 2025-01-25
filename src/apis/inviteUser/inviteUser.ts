import { createApi } from "@reduxjs/toolkit/query/react";
import getBaseQuery from "../baseQuery/baseQuery";
import { IUserInvite } from "./interfaces";


export const inviteUser = createApi({
    baseQuery: getBaseQuery,
    reducerPath: "inviteUser",
    tagTypes: ["UserInvite"],
    endpoints: (builder) => ({
        getInvitedUsers: builder.query<any, void>({
            query: () => ({
                url: "invited-users",
                method: "GET",
            }),
            providesTags: (result) =>
                result
                    ? [
                        ...result.map(({ id }: any) => ({ type: "UserInvite", id })),
                        { type: "UserInvite", id: "LIST" },
                    ]
                    : [{ type: "UserInvite", id: "LIST" }],
        }),

        // Get a single user invite by ID
        getInvitedUserdById: builder.query({
            query: (id) => ({
                url: `invited-users/${id}`,
                method: "GET",
            }),
            providesTags: (result, error, id) => [{ type: "UserInvite", id }],
        }),

        // Create a new user invite
        createInvite: builder.mutation<void, IUserInvite>({
            query: (newInvite) => ({
                url: "invited-users",
                method: "POST",
                body: newInvite,
            }),
            invalidatesTags: [{ type: "UserInvite", id: "LIST" }],
        }),

        // Update an existing user invite
        updateInvite: builder.mutation<void, IUserInvite>({
            query: ({ id, ...updatedInvite }) => ({
                url: `invited-users/${id}`,
                method: "PUT",
                body: updatedInvite,
            }),
            invalidatesTags: (result, error, { id }) => [{ type: "UserInvite", id }],
        }),

        // Delete a user invite
        deleteInvite: builder.mutation({
            query: (id) => ({
                url: `invited-users/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: (result, error, id) => [{ type: "UserInvite", id }, { type: "UserInvite", id: "LIST" }],
        }),
    })
})

export const {
    useLazyGetInvitedUsersQuery,
    useCreateInviteMutation,
    useDeleteInviteMutation,
    useUpdateInviteMutation
} = inviteUser