import { useDispatch } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import rootReducer from "./reducers";
import { user } from "../apis/user/user";
import { persistStore } from 'redux-persist';
import { items } from "../apis/items/user";
import { auth } from "../apis/auth/auth";
import { roles } from "../apis/roles/roles";


export const store = configureStore({
  reducer: rootReducer,
  devTools: true,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
    .concat(
      user.middleware,
      items.middleware,
      auth.middleware,
      roles.middleware
    )
});

export const persistor = persistStore(store);

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch<AppDispatch>;
