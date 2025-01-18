import AsyncStorage from "@react-native-async-storage/async-storage";
import { user } from "../apis/user/user";
import { authActionsSlice } from "../slices/auth";
import { persistReducer } from "redux-persist";
import { items } from "../apis/items/user";



const persistConfig = {
  key: 'root',
  storage: AsyncStorage
};

const rootReducer = {
  [user.reducerPath]: user.reducer,
  [items.reducerPath]: items.reducer,

  [authActionsSlice.name]: persistReducer(persistConfig, authActionsSlice.reducer)

};

export default rootReducer;

