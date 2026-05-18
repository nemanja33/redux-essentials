import { selectCurrentUsername } from "@/redux/features/auth/authSlice";
import { addNewPost, IPost } from "@/redux/features/posts/postsSlice";
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
   const [addRequestStatus, setAddRequestStatus] = useState<'idle' | 'pending'>(
    'idle'
  )
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectCurrentUsername);

  if (!user) {
    return <></>
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    
    if (!post.title || !post.content) return;
    try {
      setAddRequestStatus('pending')
      const { title, content, user } = post;
      dispatch(addNewPost({ title, content, user }))
      setPost(initPost)
    } catch (err) {
      console.error('Failed to save the post: ', err)
    } finally {
      setAddRequestStatus('idle')
    }
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
        <button disabled={addRequestStatus === 'pending'}>Submit</button>
      </form>
    </section>
  )
};

export { AddPostForm };