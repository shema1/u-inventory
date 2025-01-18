import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthorizedType } from "./authInterface";

interface AuthActionsState {
  token: string | null;
  isAuthorized: AuthorizedType
}

export const initialState: AuthActionsState = {
  token: null,
  isAuthorized: 'logout',
};

export const authActionsSlice = createSlice({
  initialState,
  name: "authActions",
  reducers: {
    setAppToken: (state, action: PayloadAction<string>) => ({
      ...state,
      token: action.payload,
    }),
    setAuthorizedStatus: (state, action: PayloadAction<AuthorizedType>) => ({
      ...state,
      isAuthorized: action.payload,
    }),
  },
});

export default authActionsSlice.reducer;
export const { setAppToken, setAuthorizedStatus } = authActionsSlice.actions;
