import { IPost } from "@/types/types";
import React, { useState } from "react";
import MyButton from "./UI/button/MyButton";
import MyInput from "./UI/Input/MyInput";

type PostFormProps = { create: (post: IPost) => void };

const postPlaceholder = Object.freeze<IPost>({
  body: "",
  title: "",
  id: 0,
  userId: 0,
});

const PostForm = ({ create }: PostFormProps) => {
  const [post, setPost] = useState<IPost>(postPlaceholder);

  const addNewPost = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const newPost: IPost = {
      ...post,
      id: Date.now(),
    };
    create(newPost);
    setPost(postPlaceholder);
  };

  return (
    <form>
      <MyInput
        value={post.title}
        onChange={(e) => setPost({ ...post, title: e.target.value })}
        type="text"
        placeholder="Название поста"
      />
      <MyInput
        value={post.body}
        onChange={(e) => setPost({ ...post, body: e.target.value })}
        type="text"
        placeholder="Описание поста"
      />
      <MyButton onClick={addNewPost}>Создать пост</MyButton>
    </form>
  );
};

export default PostForm;
