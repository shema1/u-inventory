import { useDispatch } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import rootReducer from "./reducers";
import { user } from "../apis/user/user";
import { persistStore } from 'redux-persist';
import { items } from "../apis/items/user";
import { inviteUser } from "../apis/inviteUser/inviteUser";
import { auth } from "../apis/auth/auth";


export const store = configureStore({
  reducer: rootReducer,
  devTools: true,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
    .concat(
      user.middleware,
      items.middleware,
      inviteUser.middleware,
      auth.middleware
    )
});

export const persistor = persistStore(store);

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch<AppDispatch>;
