import { client } from '@/api/client';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

interface IUser {
  username: string | null;
}

const initState: IUser = {
  username: null
}

const login = createAsyncThunk(
  "auth/login",
  async (username: string) => {
    await client.post("/fakeApi/login", { username });
    return username
  }
);

const logout = createAsyncThunk(
  "auth/logout",
  async () => {
    await client.post("/fakeApi/logout", {});
  }
)

const authSlice = createSlice({
  name: "auth",
  initialState: initState,
  reducers: {},
  selectors: {
    selectCurrentUsername: (state) => state.username
  },
  extraReducers: builder => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.username = action.payload
      })
      .addCase(logout.fulfilled, (state) => {
        state.username = null
      })
  }
});

export type { IUser }
export const { selectCurrentUsername } = authSlice.selectors;
export default authSlice;
export { login, logout }