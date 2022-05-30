import React, { FC } from "react";

export type PostType = {
  id: number;
  title: string;
};

type Props = {
  post: PostType;
  setPostSelect: (post: PostType) => void;
};
const Post: FC<Props> = ({ post, setPostSelect }) => {
  return (
    <div className="post">
      <span>{post.title}</span>
      <button onClick={() => setPostSelect(post)}>Edit</button>
    </div>
  );
};
export default React.memo(Post);
