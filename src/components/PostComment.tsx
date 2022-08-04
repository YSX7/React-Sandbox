import React from "react";

interface PostCommentProps {
  body: string;
  email: string;
}

function PostComment({ body, email }: PostCommentProps) {
  return (
    <div style={{ marginTop: 15 }}>
      <h5>{email}</h5>
      <div>{body}</div>
    </div>
  );
}

export default PostComment;
