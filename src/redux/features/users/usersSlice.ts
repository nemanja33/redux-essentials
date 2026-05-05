import { createSlice } from "@reduxjs/toolkit";

interface IUser {
  id: string;
  name: string
}

const initUsers: IUser[] = [
  { id: '0', name: 'Tianna Jenkins' },
  { id: '1', name: 'Kevin Grant' },
  { id: '2', name: 'Madison Price' }
]

const usersSlice = createSlice({
  name: "users",
  initialState: initUsers,
  reducers: {

  },
  selectors: {
    selectAllUsers: state => state,
    selectUserById: (state, id: string) => state.find((user) => user.id === id)
  }
});

export default usersSlice;

export const { selectAllUsers, selectUserById } = usersSlice.selectors

export type { IUser }

