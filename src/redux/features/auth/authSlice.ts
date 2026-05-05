import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IUser {
  username: string | null;
}

const initState: IUser = {
  username: null
}

const authSlice = createSlice({
  name: "auth",
  initialState: initState,
  reducers: {
    signIn(state, action: PayloadAction<string>) {
      state.username = action.payload
    },
    signOut(state) {
      state.username = null
    }
  },
  selectors: {
    selectCurrentUsername: (state) => state.username
  }
});

export type { IUser }
export const { signIn, signOut } = authSlice.actions;
export const { selectCurrentUsername } = authSlice.selectors;
export default authSlice;