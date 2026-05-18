import { selectAllUsers } from '@/redux/features/users/usersSlice';
import { useAppSelector } from '@/redux/hooks';
import { Link } from 'react-router-dom'

export const UsersPage = () => {
  const users = useAppSelector(selectAllUsers);

  const renderedUsers = users.map(user => (
    <li key={user.id}>
      <Link to={`/users/${user.id}`}>{user.name}</Link>
    </li>
  ))

  return (
    <section>
      <h2>Users</h2>

      <ul>{renderedUsers}</ul>
    </section>
  )
}