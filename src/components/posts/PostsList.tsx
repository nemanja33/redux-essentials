import { IPost } from "@/redux/features/posts/postsSlice";
import { useAppSelector } from "@/redux/hooks";
import { Link } from 'react-router-dom'
import { selectAllPosts } from "@/redux/features/posts/postsSlice";
import { PostAuthor } from "./PostAuthor";
import { PostDate } from "./PostDate";
import { PostReaction } from "./PostReactions";
import { memo } from "react";

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
  const posts = useAppSelector(selectAllPosts);
  const orderdPosts = posts.slice().sort((a, b) => b.date.localeCompare(a.date))

  return (
     <section className="posts-list">
      <h2>Posts</h2>
      {orderdPosts.map((post) => (
        <MemoizedSinglePost key={post.id} {...post} />
      ))}
    </section>
  )
};

export { PostsList }