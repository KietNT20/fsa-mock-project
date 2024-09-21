import { ENV } from "@/config/environment";
import { combineReducers, configureStore } from "@reduxjs/toolkit";

const rootReducer = combineReducers({});

const store = configureStore({
  reducer: rootReducer,
  devTools: ENV === "development",
});

export default store;
