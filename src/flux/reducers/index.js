import { combineReducers } from "redux";
import postReducer from "./postReducer";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";

export default combineReducers({
  profiles: postReducer,
  auth: authReducer,
  error: errorReducer,
});
