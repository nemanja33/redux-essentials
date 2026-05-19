import { useAppSelector } from '@/redux/hooks'
import { Link, useParams } from 'react-router-dom'
import { selectUserById } from '@/redux/features/users/usersSlice';
import { IPost, selectPostsByUser } from '@/redux/features/posts/postsSlice';

export const UserPage = () => {
  const { id } = useParams()

  const user = useAppSelector(state => selectUserById(state, id!));

  if (!user) {
    return (
      <section>
        <h2>User not found!</h2>
      </section>
    )
  }

  const posts = useAppSelector((state) => selectPostsByUser(state, user.id));

  const postTitles = posts.map((post: IPost) => (
    <li key={post.id}>
      <Link to={`/posts/${post.id}`}>{post.title}</Link>
    </li>
  ))


  return (
    <section>
      <article className="post">
        <h2>{user.name}</h2>
        {postTitles}
      </article>
    </section>
  )
}