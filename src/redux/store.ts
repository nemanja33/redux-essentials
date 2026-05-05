import { combineSlices, configureStore } from "@reduxjs/toolkit";
import postsSlice from "./features/posts/postsSlice";
import usersSlice from "./features/users/usersSlice";
import authSlice from "./features/auth/authSlice";

const reducers = combineSlices(postsSlice, usersSlice, authSlice)

export const store = configureStore({
  reducer: reducers
})

// Infer the type of `store`
export type AppStore = typeof store
// Infer the `AppDispatch` type from the store itself
export type AppDispatch = typeof store.dispatch
// Same for the `RootState` type
export type RootState = ReturnType<typeof store.getState>