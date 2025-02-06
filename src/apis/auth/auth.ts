import { createApi } from "@reduxjs/toolkit/query/react";
import { IUserLogin, IUserSignUp } from "./interfaces";
import getBaseQuery from "../baseQuery/baseQuery";


export const auth = createApi({
    baseQuery: getBaseQuery,
    reducerPath: "auth",
    endpoints: (builder) => ({
        login: builder.mutation({
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
        })
    })
})

export const {
    useLoginMutation,
    useSignUpMutation
} = auth