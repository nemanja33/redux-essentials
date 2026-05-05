import { selectCurrentUsername } from "@/redux/features/auth/authSlice";
import { IPost, postUpdated, selectPostById } from "@/redux/features/posts/postsSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { format } from "date-fns";
import { ChangeEvent, FormEvent, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const initPost = {
  id: "",
  user: "",
  title: "",
  content: "",
  date: format(new Date(), "MM/dd/yyyy HH:mm:ss")
}

const EditPostForm = () => {
  const user = useAppSelector(selectCurrentUsername);
  const [ post, setPost ] = useState<IPost>(initPost);
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const singlePost = useAppSelector((state) => selectPostById(state, id!))
  const navigate = useNavigate();

  useEffect(() => {
    if (singlePost?.user !== user) {
      return navigate("/login")
    }
  }, [])

  if (!singlePost || !id) {
    return (
      <section>
        <h2>Post not found!</h2>
      </section>
    )
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    if (!post.title || !post.content) return;
    dispatch(postUpdated(post));
    setPost(initPost);
    navigate(`/posts/${id}`)
  }

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const targetName = e.currentTarget.name;
    const value = e.currentTarget.value;
    setPost((prevPost) => {
      return {
        ...prevPost,
        id,
        [targetName]: value
      }
    })
  }

  return (
    <section>
      <h2>Edit <strong>{singlePost.title}</strong></h2>
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

export { EditPostForm };