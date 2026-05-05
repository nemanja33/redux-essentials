import { AddPostForm } from "../../components/posts/AddPostForm"
import { PostsList } from "../../components/posts/PostsList"

const Home = () => {
  return (
    <>
      <AddPostForm />
      <PostsList />
    </>
  )
}

export { Home }