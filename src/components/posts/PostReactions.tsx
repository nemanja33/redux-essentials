import { IPost, reactionAdded, ReactionName } from "@/redux/features/posts/postsSlice";
import { useAppDispatch } from "@/redux/hooks";

type Reaction = {
  type: ReactionName
  emoji: "👍" | "🎉" | "❤️" | "🚀" | "👀"
}

const REACTIONS: Reaction[] = [
  {
    type: "thumbsUp",
    emoji: "👍"
  },
  {
    type: "tada",
    emoji: "🎉"
  },
  {
    type: "heart",
    emoji: "❤️"
  },
  {
    type: "rocket",
    emoji: "🚀"
  },
  {
    type: "eyes",
    emoji: "👀"
  },
]

const PostReaction = ({
  post
}: {
  post: IPost
}) => {
  const dispatch = useAppDispatch();
  const { id } = post;

  const handleReaction = (reaction: ReactionName) => {
    dispatch(reactionAdded({ id, reaction }))
  }

  return (
    <div>
      {
        REACTIONS.map(({ type, emoji }) => (
          <button
            key={type}
            type="button"
            className="muted-button reaction-button"
            onClick={() => handleReaction(type)}>
            {emoji} {post.reactions && post.reactions[type]}
          </button>
        ))
      }
    </div>
  )
};

export { PostReaction };