import PostService from "@/API/PostService";
import { useFetching } from "@/hooks/useFetching";
import { IComment, IPost } from "@/types/types";
import { Heading } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PostComment from "./PostComment";
import Spinner from "./UI/spinner/spinner";
import { Text } from "@chakra-ui/react";

interface PostIdPageParams {
  id: string;
}

function PostIdPage() {
  const params = useParams<keyof PostIdPageParams>() as PostIdPageParams;
  const [post, setPost] = useState<IPost>({} as IPost);
  const [comments, setComments] = useState<IComment[]>([]);
  const [fetchPost, isPostsLoading, postError] = useFetching(async () => {
    const response = await PostService.getPostById(parseInt(params.id));
    setPost(response.data);
  });

  const [fetchComments, isCommentsLoading, commentError] = useFetching(
    async () => {
      const response = await PostService.getCommentsByPostId(
        parseInt(params.id)
      );
      setComments(response.data);
    }
  );

  useEffect(() => {
    fetchPost();
    fetchComments();
  }, []);

  return (
    <div className="post-id-page-container">
      <Heading>
        Вы открыли страницу поста №{params.id}, это пост, вам нужно ничего не
        есть теперь.
      </Heading>
      {isPostsLoading ? (
        <Spinner />
      ) : (
        <Text>
          {post.id} . {post.title}
        </Text>
      )}
      {isCommentsLoading ? (
        <Spinner />
      ) : (
        comments.map((comm) => (
          <PostComment key={comm.id} body={comm.body} email={comm.email} />
        ))
      )}
    </div>
  );
}

export default PostIdPage;
