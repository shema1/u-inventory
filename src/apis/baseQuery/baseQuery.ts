import { BaseQueryApi, FetchArgs, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../../store/store";

type DefinitionExtraOptions = any;

const getBaseQuery = async (args: string | FetchArgs, api: BaseQueryApi, extraOptions: DefinitionExtraOptions) => {
    try {

        const state = api.getState() as RootState;
        const accessToken = state.authActions.token
        console.log("accessToken", accessToken)
        const result = await fetchBaseQuery({
            baseUrl: process.env.REACT_APP_API_URL,
            prepareHeaders: (headers) => {
                if (accessToken) {
                    headers.set("Authorization", `Bearer ${accessToken}`);
                }
                return headers;
            },
            // credentials: "omit",
        })(args, api, extraOptions);
        return result;
    } catch (error: any) {
        return error;
    }
};

export default getBaseQuery;
