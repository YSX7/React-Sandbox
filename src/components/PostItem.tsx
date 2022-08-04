import { IPost, RemovePostFunction } from "@/types/types";
import React, { FC } from "react";
import { useNavigate } from "react-router-dom";
import MyButton from "./UI/button/MyButton";

interface PostItemProps {
  post: IPost;
  number: number;
  remove: RemovePostFunction;
}

const PostItem: FC<PostItemProps> = ({
  post = { id: -1, title: "NoName", body: "анонимусы" } as IPost,
  number,
  remove,
}) => {
  const router = useNavigate();

  return (
    <div className="post">
      <div className="post__content">
        <strong>
          {post.id}. {post.title}
        </strong>
        <div>{post.body}</div>
      </div>
      <div className="post__btns">
        <MyButton onClick={() => router(`/posts/${post.id}`)}>Открыть</MyButton>
        <MyButton onClick={() => remove(post)}>Удалить</MyButton>
      </div>
    </div>
  );
};

export default PostItem;
