import { client } from "@/api/client";
import { createAppAsyncThunk } from "@/redux/hooks";
import { createSlice } from "@reduxjs/toolkit";

interface IUser {
  id: string;
  name: string
}

const initUsers: IUser[] = []

export const fetchUsers = createAppAsyncThunk(
  'users/fetchUsers',
  async () => {
    const response = await client.get<IUser[]>('/fakeApi/users')
    return response.data
  }
)

const usersSlice = createSlice({
  name: "users",
  initialState: initUsers,
  reducers: {

  },
  selectors: {
    selectAllUsers: state => state,
    selectUserById: (state, id: string) => state.find((user) => user.id === id)
  },
  extraReducers(builder) {
    builder
      .addCase(fetchUsers.fulfilled, (state, action) => {
        return action.payload
      })
  }
});

export default usersSlice;

export const { selectAllUsers, selectUserById } = usersSlice.selectors

export type { IUser }

