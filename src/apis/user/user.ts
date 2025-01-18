import { createApi } from "@reduxjs/toolkit/query/react";
import { IUser } from "./interfaces";
import getBaseQuery from "../baseQuery/baseQuery";


export const user = createApi({
    baseQuery: getBaseQuery,
    reducerPath: "user",
    endpoints: (builder) => ({
        getUsers: builder.query<IUser[], void>({
            query: () => ({
                url: '/user',
                method: 'GET'
            })
        }),
        checkUser: builder.query<IUser[], void>({
            query: () => ({
                url: '/user/checkUser',
                method: 'GET'
            })
        })
    })
})

export const { useLazyGetUsersQuery, useLazyCheckUserQuery } = user