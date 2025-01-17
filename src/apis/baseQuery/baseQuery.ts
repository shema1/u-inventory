import { BaseQueryApi, FetchArgs, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

type DefinitionExtraOptions = any;

const getBaseQuery = async (args: string | FetchArgs, api: BaseQueryApi, extraOptions: DefinitionExtraOptions) => {
    try {
        const result = await fetchBaseQuery({
            baseUrl: 'http://localhost:4000',
            // prepareHeaders: (headers) => {
            //     if (accessToken) {
            //         headers.set("Authorization", `Bearer ${accessToken}`);
            //     }
            //     return headers;
            // },
            // credentials: "omit",
        })(args, api, extraOptions);
        return result;
    } catch (error: any) {
        return error;
    }
};

export default getBaseQuery;
