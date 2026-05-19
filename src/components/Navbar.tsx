import { logout, selectCurrentUsername } from '@/redux/features/auth/authSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { Link, useNavigate } from 'react-router-dom';
import { UserIcon } from './UserIcon';
import { fetchNotifications, selectUnradNotificationsCount } from '@/redux/features/notifications/notificationSlice';

export const Navbar = () => {
  const user = useAppSelector(selectCurrentUsername);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const notificationCount = useAppSelector(selectUnradNotificationsCount)

  function handleLogout() {
    dispatch(logout());
    navigate("/")
  }

  function fetchNewNotifications() {
    dispatch(fetchNotifications())
  }

  const UnreadNotifications = () => {
    
    return (
      notificationCount > 0 && (
        <span className="badge">{notificationCount}</span>
      )
    )
  }
  
  return (
    <nav>
      <section>
        <h1>Redux Essentials Example</h1>

        <div className="navContent">

          {
            !user ? 
            (
              <div className="navLinks">
                <Link to="/login">Login</Link>
              </div>
            )
            :
            (
              <>
                <div className="navLinks">
                  <Link to="/posts">Posts</Link>
                  <Link to="/users">Users</Link>
                  <Link to="/notifications">Notifications <UnreadNotifications /></Link>
                  <button
                    className="button small"
                    onClick={fetchNewNotifications}>
                    Refresh Notifications
                  </button>
                </div>
                <div className="navLinks">
                  <UserIcon size={32} />
                  <button className='button small' type='button' onClick={handleLogout}>Logout</button>
                </div>
              </>
            )
          }
        </div>
      </section>
    </nav>
  )
}
