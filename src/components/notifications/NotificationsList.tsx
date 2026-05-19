import { allNotificationsRead, selectAllNotifications } from "@/redux/features/notifications/notificationSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { PostAuthor } from "../posts/PostAuthor";
import { PostDate } from "../posts/PostDate";
import { useLayoutEffect } from "react";
import classnames from "classnames";

export const NotificationsList = () => {
  const notifications = useAppSelector(selectAllNotifications)
  const dispatch = useAppDispatch();

  useLayoutEffect(() => {
    dispatch(allNotificationsRead())
  })

  const renderedNotifications = notifications.map(notification => {
    const notifyClassname = classnames('notification', {
      new: notification.isNew
    })
    return (
      <div key={notification.id} className={notifyClassname}>
        <div>
          <b>
            <PostAuthor id={notification.user} showPrefix={false} />
          </b>{' '}
          {notification.message}
        </div>
        <PostDate date={notification.date} />
      </div>
    )
  })

  return (
    <section className="notificationsList">
      <h2>Notifications</h2>
      {renderedNotifications}
    </section>
  )
}