import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducers"; // Make sure this path is correct

// Create and export the store
export const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== "production", // Enable DevTools only in development
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;