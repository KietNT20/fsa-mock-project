import { ENV } from "@/config/environment";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import profileReducer from "./reducers/profileReducer";

const customizedMiddleware = {
  serializableCheck: false,
};

const rootReducer = combineReducers({
  profile: profileReducer,
});

const store = configureStore({
  reducer: rootReducer,
  devTools: ENV === "development",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware(customizedMiddleware),
});

export default store;
