import { IPost, RemovePostFunction } from "@/types/types";
import React, { FC } from "react";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import PostItem from "./PostItem";
import { Heading } from "@chakra-ui/react";

interface PostListProps {
  posts: IPost[];
  title: string;
  remove: RemovePostFunction;
}

const PostList: FC<PostListProps> = ({ posts, title, remove }) => {
  if (!posts.length) {
    return <h1 style={{ textAlign: "center" }}>Постов нет :(</h1>;
  }

  return (
    <div>
      <Heading style={{ textAlign: "center" }}>{title}</Heading>
      <TransitionGroup>
        {posts.map((elem, index) => (
          <CSSTransition key={elem.id} timeout={400} classNames="post">
            <PostItem remove={remove} number={index} post={elem} />
          </CSSTransition>
        ))}
      </TransitionGroup>
    </div>
  );
};

export default PostList;
