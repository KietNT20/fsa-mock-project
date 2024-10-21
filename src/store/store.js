import { ENV } from "@/config/environment";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
import storage from "redux-persist/lib/storage"; // mặc định sử dụng localStorage
import infoRowReducer from "./reducers/infoRowReducer";
import profileReducer from "./reducers/profileReducer";
import userProfileReducer from "./reducers/userProfileReducer";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["profile", "selectedRow", "userProfile"],
};

const rootReducer = combineReducers({
  profile: profileReducer,
  selectedRow: infoRowReducer,
  userProfile: userProfileReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const customizedMiddleware = {
  serializableCheck: {
    ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
  },
};

const store = configureStore({
  reducer: persistedReducer,
  devTools: ENV === "development",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware(customizedMiddleware),
});

export const persistor = persistStore(store);
export default store;
