import { createEntityAdapter, createSelector, createSlice, EntityState, PayloadAction } from "@reduxjs/toolkit";
import { createAppAsyncThunk } from "@/redux/hooks";
import { client } from "@/api/client";
import { logout } from "../auth/authSlice";
import { RootState } from "@/redux/store";

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

interface PostsState extends EntityState<IPost, string> {
  status: 'idle' | 'pending' | 'succeeded' | 'rejected'
  error: string | null
}

type PostUpdate = Pick<IPost, 'id' | 'title' | "content" | "reactions">

const postsAdapter = createEntityAdapter<IPost>({
  sortComparer: (a, b) => b.date.localeCompare(a.date)
});

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

const initialState: PostsState = postsAdapter.getInitialState({
  status: 'idle',
  error: null
})
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
      postsAdapter.updateOne(state, { id, changes: { title, content } })
    },
    reactionAdded(state, action: PayloadAction<{ id: string, reaction: ReactionName}>) {
      const { id, reaction } = action.payload;
      const post = state.entities[id]

      if (post?.reactions) {
        post.reactions[reaction] += 1
      }
    }
  },
  selectors: {
    selectAllPosts: state => state,
    selectPostById: (state, id: string) => state.entities[id],
    selectPostSatus: state => state.status,
    selectPostsError: state => state.error,
  },
  extraReducers(builder) {
    builder
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'succeeded'
        postsAdapter.setAll(state, action.payload);
      })
      .addCase(addNewPost.fulfilled, postsAdapter.addOne)
  },
});

export default postsSlice;

export const { postUpdated, reactionAdded } = postsSlice.actions;

export const {
  selectAll: selectAllPosts,
  selectById: selectPostById,
  selectIds: selectPostIds
} = postsAdapter.getSelectors((state: RootState) => state.posts)

export const {
  selectPostSatus,
  selectPostsError
} = postsSlice.selectors;

export type { IPost, ReactionName }

export const selectPostsByUser = createSelector(
  [
    selectAllPosts,
    (state: RootState, id: string) => id
  ],
  (posts, id) => posts.filter((post) => post.user === id)
)
