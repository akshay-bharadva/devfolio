import {combineReducers} from "redux";
import postsReducer from "./posts";
import authReducer from "./Auth";

export default combineReducers({
   posts: postsReducer,
   auth: authReducer,
});
