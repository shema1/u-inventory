import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthorizedType } from "./authInterface";
import { IUser } from "../../apis/user/interfaces";
import { IUserLoginResponse } from "../../apis/auth/interfaces";

interface AuthActionsState {
  token: string | null;
  isAuthorized: AuthorizedType;
  userInfo: IUser | null
}

export const initialState: AuthActionsState = {
  token: null,
  isAuthorized: null,
  userInfo: null
};

export const authActionsSlice = createSlice({
  initialState,
  name: "authActions",
  reducers: {
    clearData: (state) => ({
      ...state,
      token: null,
      isAuthorized: null,
      userInfo: null
    }),
    setDataAfterLogin: (state, action: PayloadAction<IUserLoginResponse>) => ({
      ...state,
      token: action.payload.token,
      isAuthorized: action.payload.userInfo.status,
      userInfo: action.payload.userInfo
    })
  },
});

export default authActionsSlice.reducer;
export const { clearData, setDataAfterLogin } = authActionsSlice.actions;
