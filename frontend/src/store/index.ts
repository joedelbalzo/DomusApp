import { configureStore } from "@reduxjs/toolkit";
import propertyReducer from "./propertySlice";

const store = configureStore({
  reducer: {
    properties: propertyReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
