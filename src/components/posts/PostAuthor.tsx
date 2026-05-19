import { selectUserById } from "@/redux/features/users/usersSlice";
import { useAppSelector } from "@/redux/hooks";

interface PostAuthorProps {
  id: string;
  showPrefix?: boolean
}

const PostAuthor = ({ id, showPrefix = true }: PostAuthorProps) => {
  const author = useAppSelector(state => selectUserById(state, id!));

  if (!author) return <></>

  return (
    <span>
      { showPrefix ? 'by ' : null }
      {author?.name ?? 'Unknown author'}
    </span>
  )
};

export { PostAuthor }