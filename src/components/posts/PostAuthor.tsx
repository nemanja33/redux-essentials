import { selectUserById } from "@/redux/features/users/usersSlice";
import { useAppSelector } from "@/redux/hooks";

const PostAuthor = ({ id }: { id: string }) => {
  const author = useAppSelector(state => selectUserById(state, id!));

  if (!author) return <></>

  return <span>by {author?.name ?? 'Unknown author'}</span>
};

export { PostAuthor }