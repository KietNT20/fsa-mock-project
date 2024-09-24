import { ENV } from "@/config/environment";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./reducers/authReducer";
import profileReducer from "./reducers/profileReducer";

const customizedMiddleware = {
  serializableCheck: false,
};

const rootReducer = combineReducers({
  auth: authReducer,
  profile: profileReducer,
});

const store = configureStore({
  reducer: rootReducer,
  devTools: ENV === "development",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware(customizedMiddleware),
});

export default store;
