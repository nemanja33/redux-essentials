import { createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit";
import { signOut } from "../auth/authSlice";
import { createAppAsyncThunk } from "@/redux/hooks";
import { client } from "@/api/client";

type ReactionType = {
  thumbsUp: number,
  tada: number,
  heart: number,
  rocket: number,
  eyes: number,
}

type ReactionName = keyof ReactionType

interface IPost {
  id: string;
  title: string;
  content: string;
  user: string;
  date: string;
  reactions?: ReactionType
};

interface PostState {
  posts: IPost[],
  status: 'idle' | 'pending' | 'succeeded' | 'failed',
  error: string | null
}

type PostUpdate = Pick<IPost, 'id' | 'title' | "content" | "reactions">

export const fetchPosts = createAppAsyncThunk(
  'posts/fetchPosts',
  async () => {
    const response = await client.get<IPost[]>('/fakeApi/posts')
    return response.data
  },
  {
    condition(arg, thunkApi) {
      const postStatus = selectPostSatus(thunkApi.getState())
      if (postStatus !== 'idle') {
        return false
      }
    }
  }
)

const initialState: PostState = {
  posts: [],
  status: 'idle',
  error: null
}
type NewPost = Pick<IPost, 'title' | 'content' | 'user'>

export const addNewPost = createAppAsyncThunk(
  'posts/addNewPost',
  // The payload creator receives the partial `{title, content, user}` object
  async (initialPost: NewPost) => {
    // We send the initial data to the fake API server
    const response = await client.post<IPost>('/fakeApi/posts', initialPost)
    // The response includes the complete post object, including unique ID
    return response.data
  }
)

export const postsSlice = createSlice({
  name: "posts",
  initialState: initialState,
  reducers: {
    postUpdated(state, action: PayloadAction<PostUpdate>) {
      const { id, title, content } = action.payload
      const post = state.posts.find(s => s.id === id);
      const now = new Date().toISOString();

      if (post) {
        post.title = title;
        post.content = content;
        post.date = now
      }
    },
    reactionAdded(state, action: PayloadAction<{ id: string, reaction: ReactionName}>) {
      const { id, reaction } = action.payload;
      const post = state.posts.find(s => s.id === id);

      if (post?.reactions) {
        post.reactions[reaction] += 1
      }
    }
  },
  selectors: {
    selectAllPosts: state => state,
    selectPostById: (state, id: string) => state.posts.find((post) => post.id === id),
    selectPostSatus: state => state.status,
    selectPostsError: state => state.error
  },
  extraReducers(builder) {
    builder
      .addCase(signOut, () => {
        return initialState
      })
      .addCase(fetchPosts.pending, (state, action) => {
        state.status = 'pending'
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'succeeded'
        // Add any fetched posts to the array
        state.posts.push(...action.payload)
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message ?? 'Unknown Error'
      })
      .addCase(addNewPost.fulfilled, (state, action) => {
        // We can directly add the new post object to our posts array
        state.posts.push(action.payload)
      })
  },
});

export default postsSlice;

export const { postUpdated, reactionAdded } = postsSlice.actions;

export const { selectAllPosts, selectPostById, selectPostSatus, selectPostsError } = postsSlice.selectors;

export type { IPost, ReactionName }