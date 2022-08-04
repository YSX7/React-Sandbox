export type RemovePostFunction = (postItem: IPost) => void;
export type SortValue = keyof IPost | number;

export interface IPost {
  id: number;
  body: string;
  title: string;
  userId: number;
}

export interface IFilter {
  sort: keyof IPost;
  query: string;
}

export interface IComment {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}
