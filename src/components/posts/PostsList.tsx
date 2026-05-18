import { fetchPosts, IPost, selectPostSatus, selectPostsError } from "@/redux/features/posts/postsSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { Link } from 'react-router-dom'
import { selectAllPosts } from "@/redux/features/posts/postsSlice";
import { PostAuthor } from "./PostAuthor";
import { PostDate } from "./PostDate";
import { PostReaction } from "./PostReactions";
import { memo, useEffect } from "react";
import { Spinner } from "../Spinner";

const SinglePost = (post: IPost) => {
  return (
    <article className="post-excerpt" key={post.id}>
      {!!post.title && <h3><Link to={`/posts/${post.id}`}>{post.title}</Link></h3>}
      {!!post.content && <p className="post-content">{post.content.substring(0, 100)}</p>}
      <PostAuthor id={post.user} />
      <PostDate date={post.date} />
      <PostReaction post={post} />
    </article>
  )
}

const MemoizedSinglePost = memo(SinglePost)

const PostsList = () => {
  const dispatch = useAppDispatch()
  const posts = useAppSelector(selectAllPosts);
  const postStatus = useAppSelector(selectPostSatus)
  const orderdPosts = posts.posts.slice().sort((a, b) => b.date.localeCompare(a.date));
  const postsError = useAppSelector(selectPostsError)

  useEffect(() => {
    if (postStatus === 'idle') {
      dispatch(fetchPosts())
    }
  }, [postStatus, dispatch])

  const Content = () => {

    return (
      <>
        {
          postStatus === 'pending' && (
            <Spinner text="Loading..." />
          )
        }
        {
          postStatus === 'failed' && (
            <div>{postsError}</div>
          )
        }
        {
          postStatus === 'succeeded' && (
            orderdPosts.map((post) => (
              <MemoizedSinglePost key={post.id} {...post} />
            ))
          )
        }
      </>
    )
  }

  return (
     <section className="posts-list">
      <h2>Posts</h2>
      <Content />
    </section>
  )
};

export { PostsList }