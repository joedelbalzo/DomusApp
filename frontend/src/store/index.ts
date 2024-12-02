import { configureStore } from "@reduxjs/toolkit";
import propertyReducer from "./propertySlice";
import authReducer from "./authSlice";

const store = configureStore({
  reducer: {
    properties: propertyReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
