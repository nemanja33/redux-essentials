import { logout, selectCurrentUsername } from '@/redux/features/auth/authSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { Link, useNavigate } from 'react-router-dom';
import { UserIcon } from './UserIcon';

export const Navbar = () => {
  const user = useAppSelector(selectCurrentUsername);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/")
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
                  <Link to="/">Posts</Link>
                  <Link to="/users">Users</Link>
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
