import { createApi } from "@reduxjs/toolkit/query/react";
import { IUserLogin, IUserLoginResponse, IUserSignUp } from "./interfaces";
import getBaseQuery from "../baseQuery/baseQuery";


export const auth = createApi({
    baseQuery: getBaseQuery,
    reducerPath: "auth",
    endpoints: (builder) => ({
        login: builder.mutation<IUserLoginResponse, IUserLogin>({
            query: (body: IUserLogin) => ({
                url: '/auth/login',
                method: 'POST',
                body
            })
        }),
        signUp: builder.mutation({
            query: (body: IUserSignUp) => ({
                url: '/auth/signup',
                method: 'POST',
                body
            })
        }),
        logout: builder.mutation({
            query: () => ({
                url: '/auth/logout',
                method: 'POST',
            })
        })
    })
})

export const {
    useLoginMutation,
    useSignUpMutation,
    useLogoutMutation
} = auth