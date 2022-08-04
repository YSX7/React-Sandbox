import { IPost } from "@/types/types";
import { useMemo } from "react";

//Сортирует посты
const useSortedPosts = (posts: IPost[], sort: keyof IPost): IPost[] => {
  const sortedPosts = useMemo(() => {
    if (sort) {
      return [...posts].sort((a, b) =>
        typeof sort === "string"
          ? (a[sort] as string).localeCompare(b[sort] as string)
          : a[sort] + b[sort]
      );
    }
    return posts;
  }, [sort, posts]);

  return sortedPosts;
};

//Вызывает сортировочный хук и производит поиск
export const usePosts = (
  posts: IPost[],
  sort: keyof IPost,
  query: string
): IPost[] => {
  const sortedPosts = useSortedPosts(posts, sort);
  const sortedAndSearchedPosts = useMemo(() => {
    return sortedPosts.filter((post) =>
      post.title.toLowerCase().includes(query)
    );
  }, [query, sortedPosts]);
  return sortedAndSearchedPosts;
};
