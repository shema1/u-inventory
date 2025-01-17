import { user } from "../apis/user/user";



const rootReducer = {
  [user.reducerPath]: user.reducer,

};

export default rootReducer;

