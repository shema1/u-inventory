import { createApi } from "@reduxjs/toolkit/query/react";
import getBaseQuery from "../baseQuery/baseQuery";
import { IRole, ICreateRoleDto } from "./interfaces";

export const roles = createApi({
    baseQuery: getBaseQuery,
    reducerPath: "roles",
    tagTypes: ["roles"],
    endpoints: (builder) => ({
        // Get all roles
        getRoles: builder.query<IRole[], void>({
            query: () => ({
                url: '/roles',
                method: 'GET'
            }),
            providesTags: (result) =>
                result
                    ? [
                        ...result.map((role) => ({ type: "roles" as const, id: role.id })),
                        { type: "roles" as const, id: "LIST" },
                    ]
                    : [{ type: "roles" as const, id: "LIST" }],
        }),

        // Get role by ID
        getRoleById: builder.query<IRole, string>({
            query: (id) => ({
                url: `/roles/${id}`,
                method: 'GET'
            }),
            providesTags: (result) => 
                result ? [{ type: 'roles', id: result.id }] : [],
        }),

        // Create role
        createRole: builder.mutation<IRole, ICreateRoleDto>({
            query: (roleData) => ({
                url: "/roles",
                method: "POST",
                body: roleData,
            }),
            invalidatesTags: [{ type: "roles", id: "LIST" }],
        }),

        // Update role
        updateRole: builder.mutation<IRole, { id: string } & ICreateRoleDto>({
            query: ({ id, ...roleData }) => ({
                url: `/roles/${id}`,
                method: "PUT",
                body: roleData,
            }),
            invalidatesTags: (result, error, { id }) => [
                { type: "roles", id },
                { type: "roles", id: "LIST" }
            ],
        }),

        // Delete role
        deleteRole: builder.mutation<void, string>({
            query: (id) => ({
                url: `/roles/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: (result, error, id) => [
                { type: "roles", id },
                { type: "roles", id: "LIST" }
            ],
        }),
    })
});

export const {
    useGetRolesQuery,
    useLazyGetRolesQuery,
    useGetRoleByIdQuery,
    useLazyGetRoleByIdQuery,
    useCreateRoleMutation,
    useUpdateRoleMutation,
    useDeleteRoleMutation
} = roles; 