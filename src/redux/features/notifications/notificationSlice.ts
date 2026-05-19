import { client } from "@/api/client";
import { createSlice } from "@reduxjs/toolkit";
import { createAppAsyncThunk } from "@/redux/hooks";
import { stat } from "fs";

interface ServerNotification {
  id: string;
  date: string;
  message: string;
  user: string;
}
interface ClientNotification extends ServerNotification {
  read: boolean,
  isNew: boolean
}

const initialState: ClientNotification[] = []

const fetchNotifications = createAppAsyncThunk(
  'notifications/fetchNotifications',
  async (_unused, thunkApi) => {
    const allNotifications = selectAllNotifications(thunkApi.getState())
    const [latestNotification] = allNotifications
    const latestTimestamp = latestNotification ? latestNotification.date : ''
    const response = await client.get<ServerNotification[]>(
      `/fakeApi/notifications?since=${latestTimestamp}`
    )
    return response.data
  }
)

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    allNotificationsRead(state) {
      state.forEach((notification) => {
        notification.read = true
      })
    }
  },
  selectors: {
    selectAllNotifications: state => state,
    selectUnradNotificationsCount: (state) => {
      const unread = state.filter(notification => !notification.read);
      return unread.length
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchNotifications.fulfilled, (state, action) => {
        const notificationsWithMetadata: ClientNotification[] = 
          action.payload.map((notification) => ({
            ...notification,
            read: false,
            isNew: true
          }));

        state.forEach(notification => {
          notification.isNew = !notification.read
        })
        state.push(...notificationsWithMetadata)
        state.sort((a, b) => b.date.localeCompare(a.date))
      })
  }
});


export const { selectAllNotifications, selectUnradNotificationsCount } = notificationSlice.selectors
export const { allNotificationsRead } = notificationSlice.actions
export { fetchNotifications }
export default notificationSlice