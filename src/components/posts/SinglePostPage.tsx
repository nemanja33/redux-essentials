import { useAppSelector } from '@/redux/hooks'
import { Link, useParams } from 'react-router-dom'
import { selectPostById } from '@/redux/features/posts/postsSlice'
import { PostAuthor } from './PostAuthor'
import { PostDate } from './PostDate'
import { PostReaction } from './PostReactions'
import { selectCurrentUsername } from '@/redux/features/auth/authSlice'

export const SinglePostPage = () => {
  const { id } = useParams()

  const post = useAppSelector(state => selectPostById(state, id!) )
  const user = useAppSelector(selectCurrentUsername);

  if (!post) {
    return (
      <section>
        <h2>Post not found!</h2>
      </section>
    )
  }

  return (
    <section>
      <article className="post">
        <h2>{post.title}</h2>
        <p className="post-content">{post.content}</p>
        <PostDate date={post.date} />
        <PostAuthor id={post.user} />
        {
          (user === post.user) && (
            <Link to={`/edit-post/${id}`} className="button">Edit Post</Link>
          )
        }
        <PostReaction post={post} />
      </article>
    </section>
  )
}