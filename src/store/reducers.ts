import AsyncStorage from "@react-native-async-storage/async-storage";
import { user } from "../apis/user/user";
import { authActionsSlice } from "../slices/auth";
import { persistReducer } from "redux-persist";



const persistConfig = {
  key: 'root',
  storage: AsyncStorage
};

const rootReducer = {
  [user.reducerPath]: user.reducer,
  [authActionsSlice.name]: persistReducer(persistConfig, authActionsSlice.reducer)

};

export default rootReducer;

