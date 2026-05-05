import { createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit";
import { sub } from "date-fns";
import { signOut } from "../auth/authSlice";

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

type PostUpdate = Pick<IPost, 'id' | 'title' | "content" | "reactions">

const initPosts: IPost[] = [
  {
    id: '1',
    title: 'First Post!',
    content: 'Hello!',
    user: '0',
    date: sub(new Date(), { hours: 10 }).toISOString(),
    reactions: {
      thumbsUp: 0,
      tada: 0,
      heart: 0,
      rocket: 0,
      eyes: 0,
    }
  },
  {
    id: '2',
    title: 'Second Post',
    content: 'More text',
    user: '2',
    date: sub(new Date(), { minutes: 5 }).toISOString(),
    reactions: {
      thumbsUp: 0,
      tada: 0,
      heart: 0,
      rocket: 0,
      eyes: 0,
    }
  }
]

export const postsSlice = createSlice({
  name: "posts",
  initialState: initPosts,
  reducers: {
    postAdded: {
      reducer(state, action: PayloadAction<IPost>) {
        state.push(action.payload)
      },
      prepare(title: string, content: string, userId: string) {
        const now = new Date().toISOString();

        return {
          payload: {id: nanoid(), title, content, user: userId, date: now }
        }
      }
    },
    postUpdated(state, action: PayloadAction<PostUpdate>) {
      const { id, title, content } = action.payload
      const post = state.find(s => s.id === id);
      const now = new Date().toISOString();

      if (post) {
        post.title = title;
        post.content = content;
        post.date = now
      }
    },
    reactionAdded(state, action: PayloadAction<{ id: string, reaction: ReactionName}>) {
      const { id, reaction } = action.payload;
      const post = state.find(s => s.id === id);

      if (post?.reactions) {
        post.reactions[reaction] += 1
      }
    }
  },
  selectors: {
    selectAllPosts: state => state,
    selectPostById: (state, id: string) => state.find((post) => post.id === id),
  },
  extraReducers(builder) {
    builder.addCase(signOut, () => {
      return initPosts
    })
  },
});

export default postsSlice;

export const { postAdded, postUpdated, reactionAdded } = postsSlice.actions;

export const { selectAllPosts, selectPostById } = postsSlice.selectors;

export type { IPost, ReactionName }