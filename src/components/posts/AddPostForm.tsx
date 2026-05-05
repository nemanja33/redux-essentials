import { selectCurrentUsername } from "@/redux/features/auth/authSlice";
import { IPost, postAdded } from "@/redux/features/posts/postsSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { format } from "date-fns";
import { ChangeEvent, FormEvent, useState } from "react";

const initPost = {
  title: "",
  content: "",
  user: "",
  date: format(new Date(), "MM/dd/yyyy HH:mm:ss")
}

const AddPostForm = () => {
  const [ post, setPost ] = useState<Omit<IPost, "id">>(initPost);
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectCurrentUsername);

  if (!user) {
    return <></>
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    
    if (!post.title || !post.content) return;
    dispatch(postAdded(post.title, post.content, user))
    setPost(initPost)
  }

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const targetName = e.currentTarget.name;
    const value = e.currentTarget.value;
    setPost((prevPost) => {
      return {
        ...prevPost,
        [targetName]: value
      }
    })
  }

  return (
    <section>
      <h2>Add a New Post</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title</label>
          <input type="text" id="title" placeholder="Title..." value={post.title} name="title" onChange={handleInputChange} />
        </div>
        <div>
          <label htmlFor="content">Content</label>
          <textarea id="content" placeholder="Content..." value={post.content} name="content" onChange={handleInputChange}></textarea>
        </div>
        <button disabled={!post.title || !post.content}>Submit</button>
      </form>
    </section>
  )
};

export { AddPostForm };