import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import comments from "../modules/commentsSlice";
import user from "../modules/userSlice";
import posts from "../modules/postViewSlice";
import modal from "../modules/modalSlice";
import mainupdateSlice from "../modules/mainupdateSlice";
const persistConfig = {
  key: "root",
  storage,
};
const reducers = combineReducers({
  comments,
  user,
  posts,
  modal,
  mainupdateSlice,
});
const persistedReducer = persistReducer(persistConfig, reducers);
const store = configureStore({
  reducer: persistedReducer,
});
export default store;
